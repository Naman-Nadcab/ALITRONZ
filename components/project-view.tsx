import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { ProjectPlate } from "@/components/project-plate";
import { WorkflowSpine, familyFromCategory } from "@/components/visuals/family-visual";
import { componentStatusLabel, projectSystems } from "@/content/project-systems";
import { projectDisclaimer, type Project } from "@/content/projects";
import { absoluteUrl } from "@/lib/site-url";

export function ProjectView({ project }: { project: Project }) {
  const family = familyFromCategory(project.category);
  const system = projectSystems[project.slug];
  const workflows = system?.workflows ?? project.workflows;
  const limitations = system?.limitations ?? project.limitations;
  const security = system?.security ?? project.security;
  const serviceLinks = system?.serviceLinks ?? project.serviceLinks;
  return (
    <div className={`detail-page project-page family-${family}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          abstract: project.summary,
          description: projectDisclaimer,
          url: absoluteUrl(`/work/${project.slug}`),
          image: absoluteUrl("/opengraph-image"),
          creator: { "@id": `${absoluteUrl("/")}#organization` },
          keywords: [project.category, project.industry, ...project.services],
        }}
      />
      <header className={`page-hero project-hero family-${family}`}>
        <div className="wrap page-hero-split">
          <div>
            <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Our work", href: "/work" }, { label: project.title }]} />
            <p className="kind-banner">{projectDisclaimer}</p>
            <h1 className="gap-top">{project.title}</h1>
            <p className="lede">{project.summary}</p>
            <ul className="fact-list">
              {dedupeTags([project.kindLabel, project.category, project.industry, ...project.services]).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
          <figure className="project-hero-plate">
            <ProjectPlate slug={project.slug} />
            <figcaption>{project.kindLabel}. Visualised for this concept; not a live customer system.</figcaption>
          </figure>
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
          {system ? (
            <section className="block" id="system">
              <h2>Proposed system</h2>
              <p className="muted">How the concept is layered, from the people or sources at the top to the systems the client already owns at the bottom. Arrows show the direction of requests.</p>
              <ol className="system-layers" aria-label="System layers">
                {system.layers.map((layer, index) => (
                  <li key={layer.name} style={{ "--layer-index": index } as React.CSSProperties}>
                    <span className="system-layer-name">{layer.name}</span>
                    <ul>
                      {layer.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}
          {system ? (
            <section className="block" id="components">
              <h2>What is real in this showcase</h2>
              <p className="muted">Each part is labelled so a reader can tell a proposed design from a simulated screen, and both from systems the client would own.</p>
              <ul className="component-list">
                {system.components.map((component) => (
                  <li key={component.name} className={`status-${component.status}`}>
                    <span className="component-status">{componentStatusLabel[component.status]}</span>
                    <strong>{component.name}</strong>
                    <p>{component.note}</p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
          {workflows ? (
            <section className="block">
              <h2>Main workflows</h2>
              <WorkflowSpine steps={workflows} />
            </section>
          ) : null}
          {security ? (
            <section className="block">
              <h2>Security and operation</h2>
              <p>{security}</p>
            </section>
          ) : null}
          {limitations ? (
            <section className="block">
              <h2>Known limitations</h2>
              <p>{limitations}</p>
            </section>
          ) : null}
          {serviceLinks ? (
            <section className="block">
              <h2>Related services</h2>
              <ul className="related-list">
                {serviceLinks.map((link) => (
                  <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </div>
      <CtaBand title="Start a similar project" body="Tell us the constraint and the first workflow. This showcase is a concept, not a template we copy into production." />
    </div>
  );
}

function dedupeTags(tags: string[]) {
  const seen = new Set<string>();
  return tags.filter((tag) => {
    const key = tag.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, " ").trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}
