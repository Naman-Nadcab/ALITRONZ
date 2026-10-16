import type { Metadata } from "next";
import { absoluteUrl } from "@/lib/site-url";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · Alitroz Technology`,
      description,
      url: absoluteUrl(path),
      siteName: "Alitroz Technology",
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Alitroz Technology`,
      description,
    },
  };
}
