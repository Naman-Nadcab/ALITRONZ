import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaBand } from "@/components/cta-band";
import { approachPage } from "@/content/company";
import { engagementModels, processStages } from "@/content/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Our approach",
  description: approachPage.summary,
  path: "/company/our-approach",
});

export default function ApproachPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Company", href: "/company" }, { label: "Our approach" }]} />
          <p className="eyebrow">Approach</p>
          <h1>{approachPage.headline}</h1>
          <p className="lede">{approachPage.summary}</p>
        </div>
      </header>
      <div className="sheet">
        <div className="wrap sheet-inner">
          <section className="block">
            <h2>The sequence</h2>
            <div className="journey">
              {processStages.map((stage, index) => (
                <article key={stage.title}>
                  <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                  <div>
                    <h3>{stage.title}</h3>
                    <p className="gap-top">{stage.purpose}</p>
                    <p className="muted gap-top">{stage.deliverables}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section className="block">
            <h2>Engagement models</h2>
            <div className="model-list">
              {engagementModels.map((model) => (
                <article key={model.title}>
                  <h3>{model.title}</h3>
                  <p>{model.text}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="block">
            <h2>Before a project starts</h2>
            {approachPage.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </section>
        </div>
      </div>
      <CtaBand label="Discuss a Project" />
    </>
  );
}
