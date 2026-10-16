import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { careersPage } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: careersPage.title,
  description: careersPage.summary,
  path: "/company/careers",
});

export default function CareersPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: careersPage.title }]} />
          <p className="eyebrow">Company</p>
          <h1>{careersPage.headline}</h1>
          <p className="lede">{careersPage.summary}</p>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
          {careersPage.sections.map((section) => (
            <section className="block" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <p><Link className="btn btn-primary" href="/contact">Contact</Link></p>
        </div>
      </div>
    </>
  );
}
