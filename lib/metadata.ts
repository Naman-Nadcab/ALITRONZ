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
  const socialImage = absoluteUrl("/opengraph-image");
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
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Alitroz Technology — intelligent product engineering" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Alitroz Technology`,
      description,
      images: [socialImage],
    },
  };
}
