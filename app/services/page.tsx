import type { Metadata } from "next";
import { CtaBand } from "@/components/cta-band";
import { capabilities, divisions } from "@/content/offerings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description: "AI, digital product engineering, Web3, and financial trading technology, with cloud, data, and security as supporting capabilities.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Services</p>
          <h1>Software divisions for serious products.</h1>
          <p className="lede">
            Four divisions cover the kinds of systems Alitroz engineers. Cloud, data, and security support that work. They are not unrelated lines of business.
          </p>
        </div>
      </header>
      <section className="section section-follow">
        <div className="wrap">
          {divisions.map((division) => (
            <article className="division division-copy" key={division.slug}>
              <div>
                <h2>{division.title}</h2>
              </div>
              <div>
                <p>{division.summary}</p>
                <ul>
                  {division.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
                <p className="gap-top-lg"><a className="text-link" href={division.path}>View {division.title}</a></p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-elevated">
        <div className="wrap">
          <div className="section-head">
            <h2>Supporting capabilities</h2>
            <p className="muted">These practices make the four divisions deployable, understandable, and safer to operate.</p>
          </div>
          <div className="cap-grid">
            {capabilities.map((capability) => (
              <article key={capability.slug}>
                <a className="card-link" href={capability.path}>
                  <h3>{capability.title}</h3>
                  <p className="muted gap-top">{capability.summary}</p>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
