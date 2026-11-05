import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { engagements } from "@/content/offerings";
import { EngagementVisual } from "@/components/visuals/engagement-visual";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Engagement models",
  description: "How Alitroz scopes discovery, product development, dedicated teams, integration, and ongoing platform engineering. Prices and dates are agreed per engagement.",
  path: "/engagement-models",
});

export default function EngagementPage() {
  return (
    <>
      <header className="page-hero">
        <div className="wrap">
          <p className="eyebrow">Engagement models</p>
          <h1>Ways to start, and ways to stay.</h1>
          <p className="lede">
            These models describe what the client receives and where the boundary sits. They do not publish a price, a response time, or a duration. Those are written into the agreement for the work.
          </p>
        </div>
      </header>
      <section className="section section-paper section-follow">
        <div className="wrap engage-list">
          {engagements.map((item, index) => (
            <Link className="engage-row engage-row-rich" key={item.slug} href={item.path}>
              <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
              <strong>{item.title}</strong>
              <p>{item.summary}</p>
              <dl className="engage-row-facts">
                <div>
                  <dt>You receive</dt>
                  <dd>{item.result}</dd>
                </div>
                <div>
                  <dt>Best when</dt>
                  <dd>{item.useCases?.[0]?.text ?? item.headline}</dd>
                </div>
                <div>
                  <dt>Boundary</dt>
                  <dd>{item.outcomes[item.outcomes.length - 1]}</dd>
                </div>
              </dl>
              <EngagementVisual slug={item.slug} compact />
              <span className="engage-row-cta">Read the model <span aria-hidden="true">→</span></span>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand label="Discuss a Project" href="/start-a-project?service=Not%20sure%20yet" />
    </>
  );
}
