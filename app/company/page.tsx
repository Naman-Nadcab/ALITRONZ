import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { companyPage } from "@/content/company";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Company",
  description: companyPage.summary,
  path: "/company",
});

export default function CompanyPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Company</p>
          <h1>{companyPage.headline}</h1>
          <p className="lede">{companyPage.summary}</p>
          <div className="cta-row">
            <Link className="btn btn-secondary" href="/company/our-approach">Our approach</Link>
            <Link className="btn btn-secondary" href="/company/quality-and-security">Quality and security</Link>
            <Link className="btn btn-secondary" href="/company/careers">Careers</Link>
            <Link className="btn btn-primary" href="/start-a-project">Start a Project <span className="arrow" aria-hidden="true">→</span></Link>
          </div>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
          {companyPage.sections.map((section) => (
            <section className="block" key={section.title}>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
      <CtaBand />
    </>
  );
}
