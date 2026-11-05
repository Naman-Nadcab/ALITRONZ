import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FamilyVisual, WorkflowSpine } from "@/components/visuals/family-visual";
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
    <div className={`detail-page industry-page family-${family}`}>
      <header className={`page-hero family-${family}`}>
        <div className="wrap page-hero-split">
          <div>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.title }]} />
            <p className="eyebrow">{industry.eyebrow}</p>
            <h1>{industry.headline}</h1>
            <p className="lede">{industry.summary}</p>
          </div>
          <FamilyVisual family={family} />
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
    </div>
  );
}
