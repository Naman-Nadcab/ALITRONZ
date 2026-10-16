import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { DivisionFigure } from "@/components/diagrams";
import { JsonLd } from "@/components/json-ld";
import type { Offering } from "@/content/offerings";
import { absoluteUrl } from "@/lib/site-url";

export function OfferingView({ offering }: { offering: Offering }) {
  const crumbs = [
    { label: "Home", href: "/" },
    offering.kind === "division"
      ? { label: "Services", href: "/services" }
      : { label: "Capabilities", href: "/services" },
    { label: offering.title },
  ];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: offering.title,
          serviceType: offering.title,
          description: offering.summary,
          url: absoluteUrl(offering.path),
          provider: { "@type": "Organization", name: "Alitroz Technology" },
          areaServed: "Worldwide",
        }}
      />
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <p className="eyebrow">{offering.eyebrow}</p>
          <h1>{offering.headline}</h1>
          <p className="lede">{offering.summary}</p>
          <div className="cta-row">
            <Link className="btn btn-primary" href="/start-a-project">
              Discuss a Project <span className="arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="btn btn-secondary" href="/work">Explore Our Work</Link>
          </div>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
          <section className="block">
            <h2>{offering.problemTitle}</h2>
            {offering.problem.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <section className="block">
            <h2>What Alitroz builds</h2>
            <div className="hairline-grid cols-2">
              {offering.builds.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="muted gap-top">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="block">
            <h2>Deliverables</h2>
            <div className="hairline-grid cols-2">
              {offering.deliverables.map((item) => (
                <article key={item.title}>
                  <h3>{item.title}</h3>
                  <p className="muted gap-top">{item.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="block split">
            <div>
              <h2>Architecture</h2>
              {offering.architecture.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <ul className="plain-list">
                {offering.architecturePoints.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="figure-frame">
              <DivisionFigure slug={offering.slug} />
            </div>
          </section>
          <section className="block">
            <h2>Integrations and technologies</h2>
            <ul className="tech-list">
              {offering.integrations.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted gap-top">{offering.integrationNote}</p>
          </section>
          <section className="block">
            <h2>Delivery</h2>
            <div className="hairline-grid cols-3">
              {offering.process.map((step, index) => (
                <article key={step.title}>
                  <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="gap-top">{step.title}</h3>
                  <p className="gap-top">{step.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="block">
            <h2>Security, testing, and operation</h2>
            {offering.assurance.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            {offering.boundary ? <p className="boundary gap-top">{offering.boundary}</p> : null}
          </section>
          <section className="block">
            <p className="kicker">Concept showcase</p>
            <h2 className="gap-top">{offering.demonstrator.title}</h2>
            <p>{offering.demonstrator.text}</p>
            <p className="gap-top">
              <Link className="text-link" href={offering.demonstrator.href}>View the concept</Link>
            </p>
          </section>
          <section className="block">
            <h2>Questions</h2>
            <div className="faq">
              {offering.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
          <section className="block">
            <h2>Related</h2>
            <ul className="related-list">
              {offering.related.map((link) => (
                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
