import type { MetadataRoute } from "next";
import { hasConfiguredSiteUrl, getSiteUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: hasConfiguredSiteUrl() ? new URL("/sitemap.xml", getSiteUrl()).toString() : undefined,
    host: hasConfiguredSiteUrl() ? getSiteUrl().origin : undefined,
  };
}
