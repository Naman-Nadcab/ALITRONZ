import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description: "Software engineering for fintech and trading firms, digital-asset teams, and SaaS and enterprise companies.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Industries</p>
          <h1>Built around the constraints of the sector.</h1>
          <p className="lede">
            The engineering is shared. The permissions, the data, and the operating duty are not. These pages describe client work in each sector. They are not a claim of regulatory status.
          </p>
        </div>
      </header>
      <section className="section section-follow">
        <div className="wrap industry-grid">
          {industries.map((industry) => (
            <article key={industry.slug}>
              <a className="card-link" href={industry.path}>
                <h2>{industry.title}</h2>
                <p className="muted gap-top">{industry.summary}</p>
              </a>
            </article>
          ))}
        </div>
      </section>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
