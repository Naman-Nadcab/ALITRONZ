import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import type { Industry } from "@/content/industries";

export function IndustryView({ industry }: { industry: Industry }) {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Industries", href: "/industries" }, { label: industry.title }]} />
          <p className="eyebrow">{industry.eyebrow}</p>
          <h1>{industry.headline}</h1>
          <p className="lede">{industry.summary}</p>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
          <section className="block">
            <h2>Context</h2>
            {industry.context.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
          <section className="block">
            <h2>Systems we engineer</h2>
            <div className="hairline-grid cols-3">
              {industry.systems.map((system) => (
                <article key={system.title}>
                  <h3>{system.title}</h3>
                  <p className="muted gap-top">{system.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="block">
            <h2>How an engagement starts</h2>
            <ul className="plain-list">
              {industry.engagement.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <p className="boundary">{industry.boundary}</p>
          <section className="block">
            <h2>Related</h2>
            <ul className="related-list">
              {industry.related.map((link) => (
                <li key={link.href}><a href={link.href}>{link.label}</a></li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
