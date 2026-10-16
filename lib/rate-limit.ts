type Bucket = number[];

const buckets = new Map<string, Bucket>();

export function resetRateLimit() {
  buckets.clear();
}

export function clientKey(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return headers.get("x-real-ip")?.trim() || "unknown";
}

export function rateLimit(
  key: string,
  now = Date.now(),
  limit = 8,
  windowMs = 30 * 60 * 1000,
) {
  const recent = (buckets.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  if (recent.length >= limit) {
    buckets.set(key, recent);
    return false;
  }
  recent.push(now);
  buckets.set(key, recent);
  return true;
}
