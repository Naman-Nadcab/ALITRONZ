import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { EngagementVisual } from "@/components/visuals/engagement-visual";
import { FamilyVisual, SystemFlow, familyOf } from "@/components/visuals/family-visual";
import { allOfferings, getOffering, type Offering } from "@/content/offerings";
import { absoluteUrl } from "@/lib/site-url";

function sectionFor(offering: Offering) {
  if (offering.kind === "solution") return { label: "Solutions", href: "/solutions" };
  if (offering.kind === "engagement") return { label: "Engagement models", href: "/engagement-models" };
  if (offering.kind === "capability" || offering.path.startsWith("/capabilities/")) return { label: "Capabilities", href: "/services#capabilities" };
  return { label: "Services", href: "/services" };
}

export function OfferingView({ offering }: { offering: Offering }) {
  const parent = offering.parent ? getOffering(offering.parent) : undefined;
  const enquiry = offering.enquiryService
    ? `/start-a-project?service=${encodeURIComponent(offering.enquiryService)}`
    : "/start-a-project";
  const family = familyOf(offering.slug, offering.figure);
  const groupKey = offering.parent ?? (offering.kind === "division" || (offering.kind === "capability" && !offering.parent) ? offering.slug : undefined);
  const siblings = groupKey
    ? allOfferings.filter((item) => item.parent === groupKey && item.slug !== offering.slug)
    : allOfferings.filter((item) => item.kind === offering.kind && item.slug !== offering.slug && (offering.kind === "solution" || offering.kind === "engagement"));
  const partOfSolutions = offering.kind === "solution"
    ? []
    : allOfferings.filter((item) => item.kind === "solution" && item.related.some((link) => link.href === offering.path));
  const panel = {
    title: offering.title.length > 24 ? offering.title.slice(0, 22).trimEnd() + "…" : offering.title,
    readout: offering.builds[0]?.title ?? offering.result,
    support: offering.builds.slice(1, 3).map((item) => item.title).join(" · "),
    pill: offering.deliverables[0]?.title ?? "Scoped",
  };
  const demoIsConcept = offering.demonstrator.href.startsWith("/work");
  const demoLabel = demoIsConcept ? "Concept showcase" : offering.demonstrator.href.startsWith("/solutions") ? "Connected solution" : "Read alongside";
  const demoCta = demoIsConcept ? "View the concept" : offering.demonstrator.href.startsWith("/solutions") ? "Open the solution" : "Open the page";
  const crumbs = [
    { label: "Home", href: "/" },
    sectionFor(offering),
    ...(parent ? [{ label: parent.title, href: parent.path }] : []),
    { label: offering.title },
  ];
  const toc = [
    ...(offering.kind === "solution" ? [["composition", "Composition"]] : []),
    ["problem", "Problem"],
    ...(offering.useCases && offering.useCases.length > 0 ? [["use", "Where it is used"]] : []),
    ["builds", "What we build"],
    ["deliverables", "Deliverables"],
    ["architecture", offering.kind === "engagement" ? "How it runs" : "Architecture"],
    ["delivery", "Delivery"],
    ["assurance", "Quality"],
    ["questions", "Questions"],
  ] as const;

  return (
    <div className={`detail-page offering-page kind-${offering.kind} family-${family}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: offering.title,
          serviceType: offering.title,
          description: offering.summary,
          url: absoluteUrl(offering.path),
          provider: { "@id": `${absoluteUrl("/")}#organization` },
          areaServed: "Worldwide",
        }}
      />
      <header className={`page-hero family-${family}`}>
        <div className="wrap page-hero-split">
          <div>
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow">{offering.eyebrow}</p>
            <h1 className={offering.headline.length > 64 ? "is-long" : undefined}>{offering.headline}</h1>
            <p className="lede">{offering.summary}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href={enquiry}>
                Discuss a Project <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-secondary" href="/work">Explore Our Work</Link>
            </div>
            <ul className="hero-facts" aria-label="At a glance">
              {offering.kind === "engagement" ? (
                <>
                  <li>
                    <span>You receive</span>
                    <strong>{offering.result}</strong>
                  </li>
                  <li>
                    <span>Best when</span>
                    <strong>{offering.useCases?.[0]?.text ?? offering.headline}</strong>
                  </li>
                  <li>
                    <span>Commercials</span>
                    <strong>Scoped per agreement. No published rate card, duration, or acceptance promise.</strong>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <span>{parent ? "Part of" : offering.kind === "solution" ? "Solution type" : "Scope"}</span>
                    <strong>{parent ? parent.title : offering.kind === "solution" ? "Connected system across several capabilities" : `${siblings.length} specialist services`}</strong>
                  </li>
                  <li>
                    <span>Result</span>
                    <strong>{offering.result}</strong>
                  </li>
                  <li>
                    <span>{demoLabel}</span>
                    <strong>{offering.demonstrator.title}</strong>
                  </li>
                </>
              )}
            </ul>
          </div>
          {offering.kind === "engagement" ? <EngagementVisual slug={offering.slug} /> : <FamilyVisual family={family} variant={offering.slug} panel={panel} />}
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
            {offering.kind === "solution" ? (
              <section className="block" id="composition">
                <p className="eyebrow">How this solution is composed</p>
                <h2 className="gap-top">Several specialist services, connected around one problem.</h2>
                <ol className="composition-strip" aria-label="Services that compose this solution">
                  {offering.related.map((link, index) => (
                    <li key={link.href}>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ol>
                <p className="muted">The services above are scoped and delivered as one plan; each link opens the specialist page that explains that part of the system.</p>
              </section>
            ) : null}
            <section className="block" id="problem">
              <p className="eyebrow">{offering.problemTitle}</p>
              <p className="problem-lead">{offering.problem[0]}</p>
              {offering.problem.slice(1).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
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
              <h2>{offering.kind === "engagement" ? "How the engagement runs" : "Architecture"}</h2>
              <div className="architecture-copy">
                {offering.architecture.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <ul className="plain-list">
                  {offering.architecturePoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              {offering.kind === "engagement" ? null : <SystemFlow family={family} variant={offering.slug} noun={offering.kind} />}
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
              <p className="kicker">{demoLabel}</p>
              <h2 className="gap-top">{offering.demonstrator.title}</h2>
              <p>{offering.demonstrator.text}</p>
              <p className="gap-top">
                <Link className="text-link" href={offering.demonstrator.href}>{demoCta}</Link>
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
            {partOfSolutions.length > 0 ? (
              <section className="block" id="solutions">
                <h2>Part of these solutions</h2>
                <p className="muted">This service is one component of a larger system. The solution pages show how it combines with the other disciplines around one business problem.</p>
                <nav className="sibling-nav sibling-grid" aria-label="Solutions that include this service">
                  {partOfSolutions.map((solution) => (
                    <Link key={solution.path} href={solution.path}>{solution.title}</Link>
                  ))}
                </nav>
              </section>
            ) : null}
            {siblings.length > 0 ? (
              <section className="block" id="siblings">
                <h2>{parent ? `Other ${parent.title} services` : offering.kind === "division" ? `Specialist ${offering.title} services` : "Related pages in this group"}</h2>
                <nav className="sibling-nav sibling-grid" aria-label={parent ? `Other ${parent.title} services` : "Specialist services"}>
                  {siblings.map((sibling) => (
                    <Link key={sibling.path} href={sibling.path} aria-current={sibling.path === offering.path ? "page" : undefined}>
                      <strong>{sibling.title}</strong>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </nav>
              </section>
            ) : null}
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
    </div>
  );
}
