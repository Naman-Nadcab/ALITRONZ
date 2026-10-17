import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { FamilyVisual, WorkflowSpine, familyFromCategory } from "@/components/visuals/family-visual";
import { projectDisclaimer, type Project } from "@/content/projects";

export function ProjectView({ project }: { project: Project }) {
  const family = familyFromCategory(project.category);
  return (
    <>
      <header className="page-hero">
        <div className="wrap page-hero-split">
          <div>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our work", href: "/work" }, { label: project.title }]} />
            <p className="kind-banner">{projectDisclaimer}</p>
            <h1 className="gap-top">{project.title}</h1>
            <p className="lede">{project.summary}</p>
            <ul className="fact-list">
              <li>{project.kindLabel}</li>
              <li>{project.category}</li>
              <li>{project.industry}</li>
              {project.services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>
          <FamilyVisual family={family} />
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
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
              <WorkflowSpine steps={project.workflows} />
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
