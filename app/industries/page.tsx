import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { industryFamily } from "@/components/industry-view";
import { FamilyVisual } from "@/components/visuals/family-visual";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description: "Software engineering for fintech, digital assets, SaaS, healthcare technology, commerce, logistics, and enterprise operations.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries" }]} />
          <p className="eyebrow">Industries</p>
          <h1>Built around the constraints of the sector.</h1>
          <p className="lede">
            The engineering is shared. The permissions, the data, and the operating duty are not. These pages describe client work in each sector. They are not a claim of regulatory status.
          </p>
        </div>
      </header>
      <section className="section section-paper section-follow">
        <div className="wrap">
          <div className="sector-grid">
            {industries.map((industry, index) => {
              const family = industryFamily[industry.slug] ?? "product";
              return (
                <article className={`sector-card family-${family}`} key={industry.slug}>
                  <FamilyVisual family={family} compact variant={industry.slug} />
                  <div className="sector-card-body">
                    <p className="kicker">{String(index + 1).padStart(2, "0")} · {industry.eyebrow}</p>
                    <h2><Link href={industry.path}>{industry.title}</Link></h2>
                    <p>{industry.summary}</p>
                    <p className="sector-card-label">Systems we engineer</p>
                    <ul className="sector-card-systems">
                      {industry.systems.slice(0, 3).map((system) => (
                        <li key={system.title}>{system.title}</li>
                      ))}
                    </ul>
                    <p className="sector-card-boundary">{industry.boundary}</p>
                    <Link className="text-link" href={industry.path}>Open the sector page</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
