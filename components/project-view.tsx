import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { DivisionFigure } from "@/components/diagrams";
import { projectDisclaimer, type Project } from "@/content/projects";

const figureFor: Record<string, string> = {
  "AI and Automation": "ai",
  "Custom Software": "product",
  "Web and Mobile Applications": "product",
  "Web3 and Blockchain": "web3",
  "Financial and Trading Technology": "finance",
  "Cloud and Data Engineering": "cloud",
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
            <li>{project.category}</li>
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
            <DivisionFigure slug={project.slug} figure={figureFor[project.category] ?? "product"} />
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
          {project.workflows ? (
            <section className="block">
              <h2>Main workflows</h2>
              <ul className="plain-list">
                {project.workflows.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ) : null}
          {project.security ? (
            <section className="block">
              <h2>Security and operation</h2>
              <p>{project.security}</p>
            </section>
          ) : null}
          {project.limitations ? (
            <section className="block">
              <h2>Known limitations</h2>
              <p>{project.limitations}</p>
            </section>
          ) : null}
          {project.serviceLinks ? (
            <section className="block">
              <h2>Related services</h2>
              <ul className="related-list">
                {project.serviceLinks.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
      <CtaBand title="Start a similar project" body="Tell us the constraint and the first workflow. This showcase is a concept, not a template we copy into production." />
    </>
  );
}
