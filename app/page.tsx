import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Alitroz Technology — Intelligent products for ambitious businesses" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alitroz Technology — Intelligent products for ambitious businesses",
    description: site.description,
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Alitroz Technology — intelligent product engineering" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alitroz Technology — Intelligent products for ambitious businesses",
    description: site.description,
    images: ["/opengraph-image"],
  },
};

export default function Page() {
  return <HomePage />;
}
