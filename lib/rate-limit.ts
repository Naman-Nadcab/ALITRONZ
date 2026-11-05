type Bucket = number[];

const buckets = new Map<string, Bucket>();
const MAX_LOCAL_BUCKETS = 5_000;
let lastCleanup = 0;

export function resetRateLimit() {
  buckets.clear();
  lastCleanup = 0;
}

export function clientKey(headers: Headers) {
  const trusted = process.env.TRUST_PROXY_HEADERS === "true";
  if (!trusted) return "untrusted-network";
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

function cleanup(now: number, windowMs: number) {
  if (now - lastCleanup < windowMs || buckets.size === 0) return;
  for (const [key, stamps] of buckets) {
    const recent = stamps.filter((stamp) => now - stamp < windowMs);
    if (recent.length === 0) buckets.delete(key);
    else buckets.set(key, recent);
  }
  while (buckets.size > MAX_LOCAL_BUCKETS) {
    const oldest = buckets.keys().next().value;
    if (typeof oldest !== "string") break;
    buckets.delete(oldest);
  }
  lastCleanup = now;
}

function localRateLimit(
  key: string,
  now = Date.now(),
  limit = 8,
  windowMs = 30 * 60 * 1000,
) {
  cleanup(now, windowMs);
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}

async function sharedRateLimit(key: string, now: number, limit: number, windowMs: number) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/+$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  const window = Math.floor(now / windowMs);
  const redisKey = `alitroz:enquiry:${window}:${key}`;
  try {
    const response = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", redisKey],
        ["EXPIRE", redisKey, Math.ceil(windowMs / 1000) + 60],
      ]),
      cache: "no-store",
    });
    if (!response.ok) return null;
    const result = (await response.json()) as { result?: unknown }[];
    const count = Number(result[0]?.result);
    return Number.isFinite(count) ? count <= limit : null;
  } catch {
    return null;
  }
}

export async function rateLimit(
  key: string,
  now = Date.now(),
  limit = 8,
  windowMs = 30 * 60 * 1000,
) {
  const shared = await sharedRateLimit(key, now, limit, windowMs);
  return shared ?? localRateLimit(key, now, limit, windowMs);
}
