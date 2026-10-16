const FALLBACK_ORIGIN = "http://localhost:3000";

export function hasConfiguredSiteUrl() {
  return Boolean(process.env.NEXT_PUBLIC_SITE_URL?.trim());
}

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const url = new URL(raw);
      if (url.protocol === "http:" || url.protocol === "https:") {
        return url;
      }
    } catch {
      // Fall through to the local origin so builds still have absolute URLs.
    }
  }
  return new URL(FALLBACK_ORIGIN);
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}
