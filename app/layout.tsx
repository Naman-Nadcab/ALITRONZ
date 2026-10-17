import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Instrument_Serif, Manrope, Syne } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { getPublicIdentity } from "@/lib/public-identity";
import { getSiteUrl, hasConfiguredSiteUrl } from "@/lib/site-url";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const display = Syne({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const editorial = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Alitroz Technology",
    template: "%s · Alitroz Technology",
  },
  description: site.description,
  applicationName: "Alitroz Technology",
  openGraph: {
    type: "website",
    siteName: "Alitroz Technology",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: "#F3F1EC" };

function warnIfSiteUrlMissing() {
  const flag = globalThis as typeof globalThis & { __alitrozSiteUrlWarned?: boolean };
  if (flag.__alitrozSiteUrlWarned || process.env.NODE_ENV !== "production" || hasConfiguredSiteUrl()) return;
  flag.__alitrozSiteUrlWarned = true;
  console.warn("NEXT_PUBLIC_SITE_URL is unset. Canonical, Open Graph, and sitemap URLs will use http://localhost:3000 until it is set.");
}

export default function RootLayout({ children }: { children: ReactNode }) {
  warnIfSiteUrlMissing();
  const identity = getPublicIdentity();
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${siteUrl.origin}/#organization`,
    name: site.name,
    url: siteUrl.origin,
    description: site.description,
  };
  if (identity.email) organization.email = identity.email;
  if (identity.address) organization.address = identity.address;

  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${editorial.variable}`}>
      <body>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              organization,
              {
                "@type": "WebSite",
                "@id": `${siteUrl.origin}/#website`,
                name: site.name,
                url: siteUrl.origin,
                description: site.description,
                publisher: { "@id": `${siteUrl.origin}/#organization` },
              },
            ],
          }}
        />
        <a className="skip-link" href="#content">Skip to content</a>
        <SiteHeader />
        <main id="content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
