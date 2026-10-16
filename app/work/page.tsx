import type { Metadata } from "next";
import { WorkBrowser } from "@/components/work-browser";
import { projectDisclaimer, projects } from "@/content/projects";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our work",
  description: "Concept showcases and internal demonstrations for AI, software, Web3, trading technology, and cloud and data engineering. Not customer delivery claims.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Our work</p>
          <h1>Concept showcases, labelled as concepts.</h1>
          <p className="lede">{projectDisclaimer} Filter by the kind of system. None of these pages invent a client, a metric, or a delivery date.</p>
        </div>
      </header>
      <section className="section section-follow">
        <div className="wrap">
          <WorkBrowser projects={projects} />
        </div>
      </section>
    </>
  );
}
