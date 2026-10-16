import Link from "next/link";
import { DivisionFigure } from "@/components/diagrams";
import { AlitrozCore } from "@/components/three/alitroz-core";
import { SystemDiagram } from "@/components/system-diagram";
import { CtaBand } from "@/components/cta-band";
import { engagementModels, hero, principles, processStages } from "@/content/home";
import { industries } from "@/content/industries";
import { capabilities, divisions } from "@/content/offerings";
import { projects } from "@/content/projects";

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.title}</h1>
            <p className="lede">{hero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/start-a-project">
                {hero.primary} <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-secondary" href="/work">{hero.secondary}</Link>
            </div>
            <ul className="hero-index">
              {divisions.map((division) => (
                <li key={division.slug}><Link href={division.path}>{division.title}</Link></li>
              ))}
            </ul>
          </div>
          <div className="hero-visual">
            <AlitrozCore />
            <p className="core-caption">
              <span>The Alitroz Core</span>
              Connected systems, held in one instrument.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">01 — Positioning</p>
            <h2>Complex ideas. Engineered into products.</h2>
            <p>
              Alitroz moves from the business problem through architecture, implementation, validation, deployment, and continued improvement. The value is a system people can operate, not a list of technologies.
            </p>
            <p>
              Discovery clarifies the outcome, the constraints, and what should not be built. The later stages stay connected, so the work does not stall between a prototype and real use.
            </p>
          </div>
          <SystemDiagram />
        </div>
      </section>

      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">02 — Services</p>
            <h2>Four divisions. One engineering standard.</h2>
            <p className="muted">Each division is a way of taking a business problem through to software. The supporting capabilities sit underneath all four.</p>
          </div>
          <div>
            {divisions.map((division, index) => (
              <article className="division" key={division.slug}>
                <div>
                  <p className="index-no">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{division.title}</h3>
                </div>
                <div>
                  <p>{division.result}</p>
                  <ul>
                    {division.outcomes.slice(0, 2).map((outcome) => (
                      <li key={outcome}>{outcome}</li>
                    ))}
                  </ul>
                  <p className="gap-top-lg">
                    <Link className="text-link" href={division.path}>Explore {division.title}</Link>
                  </p>
                </div>
                <div className="figure-frame">
                  <DivisionFigure slug={division.slug} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-elevated">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">03 — Capabilities</p>
            <h2>Engineering that keeps the product runnable.</h2>
            <p className="muted">Cloud, data, and security support the four divisions. They are not separate businesses added for appearance.</p>
          </div>
          <div className="cap-grid">
            {capabilities.map((capability) => (
              <article key={capability.slug}>
                <Link className="card-link" href={capability.path}>
                  <p className="kicker">Capability</p>
                  <h3 className="gap-top">{capability.title}</h3>
                  <p className="muted gap-top">{capability.result}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="work">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">04 — Selected work</p>
            <h2>Engineering concepts, clearly labelled.</h2>
            <p className="muted">These showcases describe how Alitroz would approach a problem. They are not completed customer deliveries, and no client outcomes are claimed.</p>
          </div>
          <div className="work-grid">
            {projects.map((project) => (
              <article key={project.slug}>
                <Link className="card-link" href={`/work/${project.slug}`}>
                  <p className="kicker">{project.kindLabel}</p>
                  <h3 className="gap-top">{project.title}</h3>
                  <p className="muted gap-top">{project.summary}</p>
                  <p className="gap-top-lg">View the concept</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper" id="industries">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">05 — Industries</p>
            <h2>Sector context changes the constraints.</h2>
            <p>The same engineering discipline meets different permissions, data, and operating duties. These pages describe software for companies in each sector. They are not a regulatory status.</p>
          </div>
          <div className="industry-grid">
            {industries.map((industry) => (
              <article key={industry.slug}>
                <Link className="card-link" href={industry.path}>
                  <h3>{industry.title}</h3>
                  <p className="muted gap-top">{industry.summary}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">06 — Process</p>
            <h2>Discovery to support, with a reason for each stage.</h2>
          </div>
          <div className="process-rail">
            {processStages.map((stage) => (
              <article key={stage.title}>
                <h3>{stage.title}</h3>
                <p className="muted">{stage.purpose}</p>
                <p className="gap-top"><strong>Deliverable. </strong>{stage.deliverables}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">07 — Engagement</p>
            <h2>Ways to start, without a fictional rate card.</h2>
            <p>Each model is scoped in writing. We do not publish standard prices or delivery times, because both depend on the requirements.</p>
          </div>
          <div className="model-list">
            {engagementModels.map((model, index) => (
              <article key={model.title}>
                <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                <h3>{model.title}</h3>
                <p>{model.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-elevated">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">08 — Working principles</p>
            <h2>How an engagement is handled.</h2>
            <p className="muted">These are working practices. They are not certifications, testimonials, or performance statistics.</p>
          </div>
          <div className="principle-grid">
            {principles.map((principle) => (
              <article key={principle.title}>
                <h3>{principle.title}</h3>
                <p className="muted gap-top">{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand label="Start a Project" />
    </>
  );
}
