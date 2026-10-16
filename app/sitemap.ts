import type { MetadataRoute } from "next";
import { routes } from "@/content/routes";
import { publishedOn } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getSiteUrl().origin;
  return routes.map((path) => ({
    url: new URL(path, origin).toString(),
    lastModified: publishedOn,
    changeFrequency: path === "/" ? "monthly" : "yearly",
    priority: path === "/" ? 1 : path === "/services" || path === "/start-a-project" ? 0.8 : 0.6,
  }));
}
