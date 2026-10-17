import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { WorkflowSpine } from "@/components/visuals/family-visual";
import type { Industry } from "@/content/industries";

const industryFamily: Record<string, string> = {
  fintech: "finance",
  "digital-assets-web3": "web3",
  saas: "product",
  healthcare: "security",
  ecommerce: "product",
  logistics: "cloud",
  enterprise: "data",
};

export function IndustryView({ industry }: { industry: Industry }) {
  const family = industryFamily[industry.slug] ?? "product";
  return (
    <>
      <header className="page-hero">
        <div className="wrap page-hero-split">
          <div>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.title }]} />
            <p className="eyebrow">{industry.eyebrow}</p>
            <h1>{industry.headline}</h1>
            <p className="lede">{industry.summary}</p>
          </div>
          <IndustryMark family={family} />
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
          <section className="block">
            <h2>Common challenges</h2>
            {industry.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <section className="block">
            <h2>Systems we engineer</h2>
            <div className="deliver-board">
              {industry.systems.map((system) => (
                <article key={system.title}>
                  <h3>{system.title}</h3>
                  <p className="muted gap-top">{system.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="block">
            <h2>Typical workflows</h2>
            <WorkflowSpine steps={industry.workflows} />
          </section>
          <section className="block split">
            <div>
              <h2>Architecture</h2>
              {industry.architecture.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div>
              <h2>How an engagement starts</h2>
              <ol className="spine">
                {industry.engagement.map((item, index) => (
                  <li key={item}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{item}</p>
                  </li>
                ))}
              </ol>
            </div>
          </section>
          <p className="boundary">{industry.boundary}</p>
          <section className="block">
            <p className="kicker">Concept showcase</p>
            <h2 className="gap-top">{industry.concept.label}</h2>
            <p>{industry.concept.text}</p>
            <p className="gap-top"><Link className="text-link" href={industry.concept.href}>View the concept</Link></p>
          </section>
          <section className="block">
            <h2>Related</h2>
            <ul className="related-list">
              {industry.related.map((link) => (
                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <CtaBand
        title={`Discuss a ${industry.title.toLowerCase()} project`}
        body="Tell us the system, the constraint, and what a first useful release would have to do."
        label="Discuss a Project"
      />
    </>
  );
}

function IndustryMark({ family }: { family: string }) {
  return (
    <figure className={`visual-stage family-${family} is-compact`} aria-hidden="true">
      <svg viewBox="0 0 720 480">
        <rect width="720" height="480" fill="#101725" />
        <circle cx="250" cy="240" r="120" fill="none" stroke="#73e5f7" strokeOpacity="0.7" />
        <circle cx="420" cy="210" r="90" fill="none" stroke="#8173fa" />
        <circle cx="360" cy="300" r="46" fill="#73e5f7" fillOpacity="0.85" />
        <path d="M130 240h240M420 120v180" stroke="#f4f6fa" strokeOpacity="0.35" />
        <text x="48" y="64" fill="#73e5f7" fontSize="14" letterSpacing="1.6">SECTOR CONSTRAINTS</text>
        <text x="48" y="420" fill="#d5deea" fontSize="22">Permissions, data, and the duty to operate.</text>
      </svg>
    </figure>
  );
}
