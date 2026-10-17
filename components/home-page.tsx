import Link from "next/link";
import { AlitrozCore } from "@/components/three/alitroz-core";
import { CtaBand } from "@/components/cta-band";
import { FamilyVisual, familyOf } from "@/components/visuals/family-visual";
import { hero, homepageJourney } from "@/content/home";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { capabilities, divisions, engagements } from "@/content/offerings";
import { projects } from "@/content/projects";

const capabilityFamily: Record<string, string> = {
  "cloud-devops": "cloud",
  "data-engineering": "data",
  cybersecurity: "security",
};

const featuredWork = [
  "enterprise-ai-knowledge-copilot",
  "saas-administration-platform",
  "digital-asset-platform-architecture",
  "forex-trading-terminal-prototype",
];

const featuredIndustries = ["fintech", "digital-assets-web3", "saas", "enterprise"];

const divisionCta: Record<string, string> = {
  "ai-automation": "Explore AI Solutions",
  "digital-product-engineering": "Explore Product Engineering",
  "web3-blockchain": "Explore Web3 Engineering",
  "financial-trading-technology": "Explore Trading Technology",
};

const featuredInsights = [
  "scope-an-enterprise-assistant",
  "tenancy-is-the-saas-product",
  "mt-integration-is-not-a-brokerage",
];

function formatDate(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (!year || !month || !day || !months[month - 1]) return iso;
  return `${day} ${months[month - 1]} ${year}`;
}

export function HomePage() {
  const work = featuredWork
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const sectorPreview = industries.filter((industry) => featuredIndustries.includes(industry.slug));
  const insightPreview = featuredInsights
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article) => article !== undefined);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-stage">
          <div className="hero-copy">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1>{hero.title}</h1>
            <p className="lede">{hero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/start-a-project">
                {hero.primary} <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-secondary" href="/work">{hero.secondary}</Link>
            </div>
          </div>
          <div className="hero-visual">
            <AlitrozCore />
            <p className="core-caption">
              <span>The Alitroz Core</span>
              A studio sculpture for connected systems.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="statement">
            <h2>Complex ideas. Engineered into products.</h2>
            <div>
              <p>
                Alitroz works across strategy, experience design, engineering, integrations, testing, and deployment. The value is a system a team can operate, not a list of technologies.
              </p>
              <p className="gap-top">
                Discovery names the outcome and the constraints. The later stages stay connected, so the work does not stall between a prototype and something people can run.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="services">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Services</p>
            <h2>Four ways to take a product from idea to software.</h2>
          </div>
          <div>
            {divisions.map((division, index) => (
              <article className={`division-stage${index % 2 ? " is-flip" : ""}`} key={division.slug}>
                <div className="division-copy">
                  <p className="index-no">{String(index + 1).padStart(2, "0")}</p>
                  <h3>{division.title}</h3>
                  <p className="gap-top">{division.result}</p>
                  <p className="gap-top-lg">
                    <Link className="text-link" href={division.path}>{divisionCta[division.slug] ?? `Explore ${division.title}`}</Link>
                  </p>
                </div>
                <FamilyVisual family={familyOf(division.slug)} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-lavender" id="work">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Selected work</p>
            <h2>Concepts and prototypes, labelled as such.</h2>
            <p>These demonstrations show how Alitroz would approach a problem. They are not completed customer deliveries, and no client outcomes are claimed.</p>
          </div>
          <div className="showcase-list">
            {work.map((project, index) => (
              <article key={project.slug} className={index === 0 ? "showcase-feature" : "showcase-card"}>
                <FamilyVisual family={familyOf(project.category)} compact />
                <div>
                  <p className="kicker">{project.kindLabel}</p>
                  <h3 className="gap-top">{project.title}</h3>
                  <p className="gap-top"><strong>Problem. </strong>{project.context}</p>
                  <p className="gap-top"><strong>Approach. </strong>{project.approach}</p>
                  <p className="gap-top-lg">
                    <Link className="text-link" href={`/work/${project.slug}`}>View the concept</Link>
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Approach</p>
            <h2>From ambitious ideas to dependable products.</h2>
          </div>
          <div className="process-rail">
            {homepageJourney.map((stage, index) => (
              <article key={stage.title}>
                <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                <h3>{stage.title}</h3>
                <p className="gap-top">{stage.text}</p>
              </article>
            ))}
          </div>
          <p className="gap-top-lg">
            <Link className="text-link" href="/company/our-approach">Read the engineering approach</Link>
          </p>
        </div>
      </section>

      <section className="section" id="capabilities">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Capabilities</p>
            <h2>The engineering that keeps a product runnable.</h2>
            <p className="muted">Cloud, data, and security support the four divisions. They are not separate businesses added for appearance.</p>
          </div>
          <div className="cap-stage">
            {capabilities.map((capability) => (
              <article key={capability.slug}>
                <FamilyVisual family={capabilityFamily[capability.slug] ?? "cloud"} compact />
                <Link href={capability.path}>
                  <p className="kicker">Capability</p>
                  <h3 className="gap-top">{capability.title}</h3>
                  <p className="gap-top">{capability.result}</p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-ice" id="industries">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Industries</p>
            <h2>The same discipline, different constraints.</h2>
            <p>These pages describe software for companies in each sector. They are not a regulatory status.</p>
          </div>
          <div className="industry-index">
            {sectorPreview.map((industry) => (
              <Link key={industry.slug} href={industry.path}>
                <h2>{industry.title}</h2>
                <p>{industry.summary}</p>
              </Link>
            ))}
          </div>
          <p className="gap-top-lg"><Link className="text-link" href="/industries">All industries</Link></p>
        </div>
      </section>

      <section className="section section-paper">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Engagement</p>
            <h2>Ways to start, without a published rate card.</h2>
            <p>Prices and dates are written into the agreement for the work. They are not implied here.</p>
          </div>
          <div className="engage-list">
            {engagements.map((model, index) => (
              <Link className="engage-row" href={model.path} key={model.slug}>
                <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                <strong>{model.title}</strong>
                <p>{model.summary}</p>
              </Link>
            ))}
          </div>
          <p className="gap-top-lg">
            <Link className="text-link" href="/engagement-models">All engagement models</Link>
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Insights</p>
            <h2>Notes from the engineering work.</h2>
            <p>Short technical writing on the problems these services actually run into.</p>
          </div>
          <div className="insight-preview">
            {insightPreview.map((article) => (
              <article key={article.slug}>
                <p className="kicker">{article.category}</p>
                <h3 className="gap-top">{article.title}</h3>
                <p className="gap-top">{article.excerpt}</p>
                <p className="muted gap-top">
                  <time dateTime={article.date}>{formatDate(article.date)}</time>
                </p>
                <p className="gap-top-lg">
                  <Link className="text-link" href={`/insights/${article.slug}`}>Read article</Link>
                </p>
              </article>
            ))}
          </div>
          <p className="gap-top-lg"><Link className="text-link" href="/insights">All insights</Link></p>
        </div>
      </section>

      <CtaBand
        title="Have something ambitious in mind?"
        body="Tell us what you are building. We will start with the business challenge, the right technical approach, and a clear path forward."
        label="Start a Project"
      />
    </>
  );
}
