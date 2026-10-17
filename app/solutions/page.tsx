import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { FamilyVisual, SystemFlow, familyOf } from "@/components/visuals/family-visual";
import { solutions } from "@/content/offerings";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Solutions",
  description: "Complete systems Alitroz can help build: enterprise AI, product modernization, digital-asset infrastructure, financial platforms, integration, and data intelligence.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Solutions</p>
          <h1>The system, not only the specialty.</h1>
          <p className="lede">
            A service is a discipline. A solution is the set of disciplines a business problem actually needs: discovery, integration, permissions, and a way to operate what was built.
          </p>
        </div>
      </header>
      <section className="section section-paper section-follow">
        <div className="wrap">
          {solutions.map((solution, index) => (
            <article className={`division-stage${index % 2 ? " is-flip" : ""}`} key={solution.slug}>
              <div>
                <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                <h2 className="gap-top">{solution.title}</h2>
                <p className="gap-top">{solution.summary}</p>
                <div className="gap-top-lg">
                  <SystemFlow family={familyOf(solution.slug, solution.figure)} />
                </div>
                <p className="gap-top-lg">
                  <Link className="text-link" href={solution.path}>View the solution</Link>
                </p>
              </div>
              <FamilyVisual family={familyOf(solution.slug, solution.figure)} compact />
            </article>
          ))}
        </div>
      </section>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
