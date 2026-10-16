import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { qualityPage } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: qualityPage.title,
  description: qualityPage.summary,
  path: "/company/quality-and-security",
});

export default function QualityPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: qualityPage.title }]} />
          <p className="eyebrow">Company</p>
          <h1>{qualityPage.headline}</h1>
          <p className="lede">{qualityPage.summary}</p>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
          {qualityPage.sections.map((section) => (
            <section className="block" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <p><Link className="text-link" href="/capabilities/application-security">Application security engineering</Link></p>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
