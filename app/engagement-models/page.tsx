import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { engagements } from "@/content/offerings";
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
      <section className="section section-follow">
        <div className="wrap industry-grid">
          {engagements.map((item) => (
            <article key={item.slug}>
              <Link className="card-link" href={item.path}>
                <h2>{item.title}</h2>
                <p className="muted gap-top">{item.summary}</p>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <CtaBand label="Discuss a Project" href="/start-a-project?service=Not%20sure%20yet" />
    </>
  );
}
