const productionOrigin = "https://alitronz.com";

function normalizedOrigin(value: string | undefined | null) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
    return url.origin.toLowerCase();
  } catch {
    return null;
  }
}

function configuredOrigins(request: Request) {
  const origins = new Set<string>([productionOrigin]);
  const siteOrigin = normalizedOrigin(process.env.NEXT_PUBLIC_SITE_URL);
  if (siteOrigin) origins.add(siteOrigin);
  for (const value of (process.env.ENQUIRY_ALLOWED_ORIGINS ?? "").split(",")) {
    const origin = normalizedOrigin(value.trim());
    if (origin) origins.add(origin);
  }
  if (process.env.NODE_ENV !== "production") {
    const requestOrigin = normalizedOrigin(request.url);
    if (requestOrigin) origins.add(requestOrigin);
  }
  return origins;
}

export function isSameOrigin(request: Request) {
  const origin = normalizedOrigin(request.headers.get("origin"));
  return origin !== null && configuredOrigins(request).has(origin);
}
