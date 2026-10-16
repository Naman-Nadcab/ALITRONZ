import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { DivisionFigure } from "@/components/diagrams";
import { projectDisclaimer, type Project } from "@/content/projects";

const figureFor: Record<string, string> = {
  "operations-knowledge-assistant": "ai-automation",
  "client-portal-and-mobile": "digital-product-engineering",
  "digital-asset-operations-console": "web3-blockchain",
  "multi-market-trading-workstation": "financial-trading-technology",
};

export function ProjectView({ project }: { project: Project }) {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our work", href: "/work" }, { label: project.title }]} />
          <p className="kind-banner">{projectDisclaimer}</p>
          <h1 className="gap-top">{project.title}</h1>
          <p className="lede">{project.summary}</p>
          <ul className="tech-list">
            <li>{project.kindLabel}</li>
            <li>{project.industry}</li>
            {project.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
          <div className="figure-frame">
            <DivisionFigure slug={figureFor[project.slug] ?? "cybersecurity"} />
          </div>
          {[
            ["Context and challenge", project.context],
            ["Constraints and requirements", project.constraints],
            ["Role", project.role],
            ["Technical approach", project.approach],
            ["Implementation", project.implementation],
            ["Outcomes", project.outcomes],
          ].map(([title, body]) => (
            <section className="block" key={title}>
              <h2>{title}</h2>
              <p>{body}</p>
            </section>
          ))}
          <section className="block">
            <h2>Technologies</h2>
            <ul className="tech-list">
              {project.technologies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="muted gap-top">Tools are illustrative of the concept. A real engagement would confirm them against the client’s constraints.</p>
          </section>
        </div>
      </div>
      <CtaBand />
    </>
  );
}
