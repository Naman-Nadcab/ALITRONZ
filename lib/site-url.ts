const PRODUCTION_ORIGIN = "https://alitronz.com";

export function hasConfiguredSiteUrl() {
  return getSiteUrl().protocol === "https:";
}

export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (raw) {
    try {
      const url = new URL(raw);
      if ((url.protocol === "http:" || url.protocol === "https:") && url.hostname) {
        return url;
      }
    } catch {
      // An invalid override falls through to the confirmed production origin.
    }
  }
  return new URL(PRODUCTION_ORIGIN);
}

export function absoluteUrl(path: string) {
  return new URL(path, getSiteUrl()).toString();
}
