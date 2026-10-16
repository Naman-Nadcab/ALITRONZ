import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
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
      <section className="section section-follow">
        <div className="wrap industry-grid">
          {solutions.map((solution) => (
            <article key={solution.slug}>
              <Link className="card-link" href={solution.path}>
                <h2>{solution.title}</h2>
                <p className="muted gap-top">{solution.summary}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
