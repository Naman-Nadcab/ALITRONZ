import type { Metadata } from "next";
import { projectDisclaimer, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our work",
  description: "Engineering concept showcases for AI, product, blockchain, and trading software. Not customer delivery claims.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Our work</p>
          <h1>Concept showcases, not borrowed credibility.</h1>
          <p className="lede">{projectDisclaimer} Each one explains the challenge, the constraints, the role Alitroz would take, and the technical approach.</p>
        </div>
      </header>
      <section className="section section-follow">
        <div className="wrap work-grid">
          {projects.map((project) => (
            <article key={project.slug}>
              <a className="card-link" href={`/work/${project.slug}`}>
                <p className="kicker">{project.kindLabel}</p>
                <h2 className="gap-top">{project.title}</h2>
                <p className="muted gap-top">{project.summary}</p>
                <p className="gap-top-lg">View the concept</p>
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
