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
  },
};

export default function Page() {
  return <HomePage />;
}
