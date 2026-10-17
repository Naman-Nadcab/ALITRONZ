import Link from "next/link";
import { AtlasCanvas } from "@/components/atlas-canvas";
import { AlitrozCore } from "@/components/three/alitroz-core";
import { CtaBand } from "@/components/cta-band";
import { FamilyVisual, familyOf } from "@/components/visuals/family-visual";
import { CapabilityExplorer } from "@/components/capability-explorer";
import { ProcessStory } from "@/components/process-story";
import { buildPaths, hero, homepageJourney } from "@/content/home";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { capabilities, divisions, engagements, solutions } from "@/content/offerings";
import { projects } from "@/content/projects";

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
    <div className="home-next">
      <section className="scene">
        <div className="wrap scene-stage">
          <div className="scene-copy">
            <p className="eyebrow">ALITROZ / DIGITAL SYSTEMS STUDIO</p>
            <h1>{hero.title}</h1>
            <p className="lede">{hero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="#atlas">
                Explore the Atlas <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-secondary" href="/start-a-project">Discuss a Project</Link>
            </div>
          </div>
          <div className="scene-core">
            <AlitrozCore />
          </div>
        </div>
        <p className="scene-line wrap">Complex ideas. Engineered into products.</p>
      </section>

      <section className="canvas-scene">
        <div className="wrap">
          <p className="eyebrow">Alitroz Atlas</p>
          <h2>Intelligent systems in motion.</h2>
          <p className="lede">Select a territory. The panel opens the real specialist pages.</p>
          <AtlasCanvas />
        </div>
      </section>

      <section className="lab-scene" id="build">
        <div className="wrap">
          <h2>What are you looking to build?</h2>
          <CapabilityExplorer paths={buildPaths} />
        </div>
      </section>

      <section className="mosaic-scene" id="services">
        <div className="wrap">
          <h2>Four ways in.</h2>
          <div className="mosaic">
            {divisions.map((division, index) => (
              <article key={division.slug} className={index === 3 ? "is-ink" : undefined}>
                <p>{String(index + 1).padStart(2, "0")}</p>
                <h3>{division.title}</h3>
                <FamilyVisual family={familyOf(division.slug)} compact />
                <p>{division.result}</p>
                <Link href={division.path}>{divisionCta[division.slug] ?? division.title}</Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="reel-scene" id="work">
        <div className="wrap reel-head">
          <h2>Concepts, labelled as concepts.</h2>
          <Link href="/work">All work</Link>
        </div>
        <div className="reel-track">
          {work.map((project) => (
            <article key={project.slug}>
              <p>{project.kindLabel}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <Link href={`/work/${project.slug}`}>View the concept</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rail-scene">
        <div className="wrap">
          <div className="reel-head">
            <h2>Ideas become systems. Systems become products.</h2>
            <Link href="/company/our-approach">The approach</Link>
          </div>
          <ProcessStory stages={homepageJourney} />
        </div>
      </section>

      <section className="atlas-scene" id="capabilities">
        <div className="wrap atlas">
          <div>
            <h2>Run it</h2>
            {capabilities.map((capability) => (
              <Link key={capability.slug} href={capability.path}>{capability.title}</Link>
            ))}
          </div>
          <div id="solutions">
            <h2>Compose it</h2>
            {solutions.map((solution) => (
              <Link key={solution.slug} href={solution.path}>{solution.title}</Link>
            ))}
          </div>
          <div id="industries">
            <h2>Where it sits</h2>
            {sectorPreview.map((industry) => (
              <Link key={industry.slug} href={industry.path}>{industry.title}</Link>
            ))}
            <Link href="/industries">All industries</Link>
          </div>
        </div>
        <div className="wrap engage-strip">
          {engagements.map((model) => (
            <Link key={model.slug} href={model.path}>{model.title}</Link>
          ))}
          <Link href="/engagement-models">All models</Link>
        </div>
      </section>

      <section className="notes-scene">
        <div className="wrap">
          <div className="reel-head">
            <h2>From the notebook.</h2>
            <Link href="/insights">All insights</Link>
          </div>
          <div className="notes">
            {insightPreview.map((article) => (
              <article key={article.slug}>
                <p>{article.category}</p>
                <h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.excerpt}</p>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have something ambitious in mind?"
        body="Tell us what you are building. We will start with the business challenge, the right technical approach, and a clear path forward."
        label="Start a Project"
      />
    </div>
  );
}
