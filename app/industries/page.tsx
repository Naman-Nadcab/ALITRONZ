import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
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
          <p className="eyebrow">Industries</p>
          <h1>Built around the constraints of the sector.</h1>
          <p className="lede">
            The engineering is shared. The permissions, the data, and the operating duty are not. These pages describe client work in each sector. They are not a claim of regulatory status.
          </p>
        </div>
      </header>
      <section className="section section-paper section-follow">
        <div className="wrap">
          <div className="industry-index">
            {industries.map((industry, index) => (
              <a key={industry.slug} href={industry.path}>
                <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                <h2>{industry.title}</h2>
                <p>{industry.summary}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
