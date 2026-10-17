import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { FamilyVisual, SystemFlow, familyOf } from "@/components/visuals/family-visual";
import { getOffering, type Offering } from "@/content/offerings";
import { absoluteUrl } from "@/lib/site-url";

function sectionFor(offering: Offering) {
  if (offering.kind === "solution") return { label: "Solutions", href: "/solutions" };
  if (offering.kind === "engagement") return { label: "Engagement models", href: "/engagement-models" };
  return { label: "Services", href: "/services" };
}

export function OfferingView({ offering }: { offering: Offering }) {
  const parent = offering.parent ? getOffering(offering.parent) : undefined;
  const enquiry = offering.enquiryService
    ? `/start-a-project?service=${encodeURIComponent(offering.enquiryService)}`
    : "/start-a-project";
  const family = familyOf(offering.slug, offering.figure);
  const crumbs = [
    { label: "Home", href: "/" },
    sectionFor(offering),
    ...(parent ? [{ label: parent.title, href: parent.path }] : []),
    { label: offering.title },
  ];
  const toc = [
    ["problem", "Problem"],
    ...(offering.useCases && offering.useCases.length > 0 ? [["use", "Where it is used"]] : []),
    ["builds", "What we build"],
    ["deliverables", "Deliverables"],
    ["architecture", "Architecture"],
    ["delivery", "Delivery"],
    ["assurance", "Quality"],
    ["questions", "Questions"],
  ] as const;

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
        <div className="wrap page-hero-split">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow">{offering.eyebrow}</p>
            <h1>{offering.headline}</h1>
            <p className="lede">{offering.summary}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href={enquiry}>
                Discuss a Project <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-secondary" href="/work">Explore Our Work</Link>
            </div>
          </div>
          <FamilyVisual family={family} />
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner doc-layout">
          <nav className="toc-sticky" aria-label="On this page">
            <p className="kicker">On this page</p>
            <ol>
              {toc.map(([id, label]) => (
                <li key={id}><a href={`#${id}`}>{label}</a></li>
              ))}
            </ol>
          </nav>
          <div className="doc-main">
            <section className="block" id="problem">
              <p className="eyebrow">{offering.problemTitle}</p>
              <p className="problem-lead">{offering.problem[0]}</p>
              {offering.problem.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
            {offering.kind === "solution" ? <SystemFlow family={family} /> : null}
            {offering.useCases && offering.useCases.length > 0 ? (
              <section className="block" id="use">
                <h2>Where it is used</h2>
                <div className="deliver-board">
                  {offering.useCases.map((item) => (
                    <article key={item.title}>
                      <h3>{item.title}</h3>
                      <p className="muted gap-top">{item.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
            <section className="block" id="builds">
              <h2>What Alitroz builds</h2>
              <div className="editorial-list">
                {offering.builds.map((item, index) => (
                  <article key={item.title}>
                    <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                    <h3>{item.title}</h3>
                    <p className="muted">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="block" id="deliverables">
              <h2>Deliverables</h2>
              <div className="deliver-board">
                {offering.deliverables.map((item) => (
                  <article key={item.title}>
                    <h3>{item.title}</h3>
                    <p className="muted gap-top">{item.text}</p>
                  </article>
                ))}
              </div>
            </section>
            <section className="block" id="architecture">
              <h2>Architecture</h2>
              <div className="split">
                <div>
                  {offering.architecture.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  <ul className="plain-list">
                    {offering.architecturePoints.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
                <SystemFlow family={family} />
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
            <section className="block" id="delivery">
              <h2>Delivery</h2>
              <div className="journey">
                {offering.process.map((step, index) => (
                  <article key={step.title}>
                    <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                    <div>
                      <h3>{step.title}</h3>
                      <p className="gap-top">{step.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
            <section className="block" id="assurance">
              <h2>Security, testing, and operation</h2>
              {offering.assurance.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {offering.boundary ? <p className="boundary gap-top">{offering.boundary}</p> : null}
              {offering.tradeoffs && offering.tradeoffs.length > 0 ? (
                <>
                  <h3 className="gap-top">Trade-offs</h3>
                  <ul className="plain-list">
                    {offering.tradeoffs.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}
            </section>
            <section className="block">
              <p className="kicker">Concept showcase</p>
              <h2 className="gap-top">{offering.demonstrator.title}</h2>
              <p>{offering.demonstrator.text}</p>
              <p className="gap-top">
                <Link className="text-link" href={offering.demonstrator.href}>View the concept</Link>
              </p>
            </section>
            <section className="block" id="questions">
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
      </div>
      <CtaBand label="Discuss a Project" href={enquiry} />
    </>
  );
}
