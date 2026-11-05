import Link from "next/link";
import { AtlasCanvas } from "@/components/atlas-canvas";
import { AlitrozCore } from "@/components/three/alitroz-core";
import { CtaBand } from "@/components/cta-band";
import { FamilyVisual, familyOf } from "@/components/visuals/family-visual";
import { CapabilityExplorer } from "@/components/capability-explorer";
import { ProjectPlate } from "@/components/project-plate";
import { ProcessStory } from "@/components/process-story";
import { MethodRibbon } from "@/components/visuals/method-ribbon";
import { buildPaths, hero, homepageJourney } from "@/content/home";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { capabilities, capabilityDetails, divisions, engagements, solutions, specialistServices } from "@/content/offerings";
import { projects } from "@/content/projects";

const featuredWork = [
  "forex-trading-terminal-prototype",
  "enterprise-ai-knowledge-copilot",
  "saas-administration-platform",
  "digital-asset-operations-console",
];

const featuredIndustries = ["fintech", "digital-assets-web3", "saas", "enterprise", "healthcare", "ecommerce"];

const divisionCta: Record<string, string> = {
  "ai-automation": "Explore AI Solutions",
  "digital-product-engineering": "Explore Product Engineering",
  "web3-blockchain": "Explore Web3 Engineering",
  "financial-trading-technology": "Explore Trading Technology",
};

const divisionDeliverable: Record<string, string> = {
  "ai-automation": "Agents, copilots, RAG systems, document intelligence",
  "digital-product-engineering": "Web apps, mobile apps, SaaS platforms, modernization",
  "web3-blockchain": "Smart contracts, dApps, wallets, tokenization, indexing",
  "financial-trading-technology": "Terminals, MT4/MT5 and liquidity integration, OMS, reporting",
};

const featuredInsights = [
  "scope-an-enterprise-assistant",
  "tenancy-is-the-saas-product",
  "mt-integration-is-not-a-brokerage",
];

const principles = [
  {
    title: "We engineer",
    text: "Products built in the client's repository, with the architecture, tests, and release path that let a team keep changing them.",
  },
  {
    title: "We integrate",
    text: "Connections to the systems a business already runs: CRMs, ledgers, trading venues, chains, identity, and data stores.",
  },
  {
    title: "We stay honest",
    text: "Concept work is labelled as concept work. No invented clients, metrics, or certifications anywhere on this site.",
  },
];


export function HomePage() {
  const work = featuredWork
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project) => project !== undefined);
  const sectorPreview = featuredIndustries
    .map((slug) => industries.find((industry) => industry.slug === slug))
    .filter((industry) => industry !== undefined);
  const insightPreview = featuredInsights
    .map((slug) => articles.find((article) => article.slug === slug))
    .filter((article) => article !== undefined);
  const facts = [
    { value: String(divisions.length), label: "engineering divisions" },
    { value: String(specialistServices.length), label: "specialist services" },
    { value: String(capabilities.length), label: "supporting capabilities" },
    { value: String(solutions.length), label: "connected solutions" },
  ];

  return (
    <div className="home-next home-motion">
      <section className="scene">
        <div className="wrap scene-stage">
          <div className="scene-copy">
            <p className="eyebrow">Alitroz Technology / Software development and consulting</p>
            <h1>{hero.title}</h1>
            <p className="lede">{hero.lede}</p>
            <div className="cta-row">
              <Link className="btn btn-primary" href="/start-a-project">
                {hero.primary} <span className="arrow" aria-hidden="true">→</span>
              </Link>
              <Link className="btn btn-secondary" href="/work">{hero.secondary}</Link>
            </div>
          </div>
          <div className="scene-core">
            <AlitrozCore />
          </div>
        </div>
        <div className="scene-line wrap" aria-label="Primary engineering divisions">
          <span>AI &amp; automation</span><span>Digital products</span><span>Web3 systems</span><span>Trading technology</span>
        </div>
      </section>

      <section className="position-scene" aria-labelledby="positioning-heading">
        <div className="wrap position-grid">
          <div className="position-copy">
            <p className="eyebrow">Who we are</p>
            <h2 id="positioning-heading">
              Complex ideas. <span className="serif-accent">Engineered</span> into products.
            </h2>
            <p className="lede">
              Alitroz Technology is a software engineering company. We design, build, integrate, and operate digital products for businesses whose requirements do not fit an off-the-shelf tool: AI systems with a permission boundary, multi-tenant platforms, blockchain applications, and trading technology for firms that hold the regulated activity themselves.
            </p>
            <ul className="fact-strip" aria-label="Catalogue facts">
              {facts.map((fact) => (
                <li key={fact.label}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="position-principles">
            {principles.map((principle, index) => (
              <article key={principle.title} className={`principle-card principle-${index + 1}`}>
                <p className="kicker">{String(index + 1).padStart(2, "0")}</p>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="canvas-scene">
        <div className="wrap">
          <p className="eyebrow">Explore</p>
          <h2>The technology universe, mapped.</h2>
          <p className="lede">Select a territory to see what it covers and open the specialist pages behind it. Every territory links to substantive service, capability, solution, and project pages.</p>
          <AtlasCanvas />
        </div>
      </section>

      <section className="lab-scene" id="build">
        <div className="wrap">
          <p className="eyebrow">Start here</p>
          <h2>What are you looking to build?</h2>
          <CapabilityExplorer paths={buildPaths} />
        </div>
      </section>

      <section className="mosaic-scene" id="services">
        <div className="wrap">
          <div className="territory-intro">
            <p className="eyebrow">What we build</p>
            <h2>Four engineering divisions. Each with its own architecture.</h2>
            <p className="lede">Every division below is drawn as the system it produces, not as a card. Follow a specialist route or enter the full environment.</p>
          </div>
          <div className="technology-territories">
            {divisions.map((division, index) => (
              <article key={division.slug} className={`technology-territory territory-${familyOf(division.slug)}`}>
                <div className="territory-copy">
                  <p className="territory-index">{String(index + 1).padStart(2, "0")} / 04 · {division.title}</p>
                  <h3>{division.headline}</h3>
                  <p>{division.result}</p>
                  <dl className="territory-facts">
                    <div>
                      <dt>We deliver</dt>
                      <dd>{divisionDeliverable[division.slug] ?? division.result}</dd>
                    </div>
                    <div>
                      <dt>You keep</dt>
                      <dd>{division.outcomes[0]}</dd>
                    </div>
                  </dl>
                  <div className="territory-links" aria-label={`Specialist ${division.title} services`}>
                    {specialistServices
                      .filter((service) => service.parent === division.slug)
                      .slice(0, 4)
                      .map((service) => (
                        <Link key={service.path} href={service.path}>{service.title}</Link>
                      ))}
                  </div>
                  <Link className="territory-enter" href={division.path}>
                    {divisionCta[division.slug] ?? division.title} <span aria-hidden="true">↗</span>
                  </Link>
                </div>
                <div className="territory-environment">
                  <FamilyVisual family={familyOf(division.slug)} variant={division.slug} caption={false} />
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="work-scene" id="work">
        <div className="wrap">
          <div className="reel-head">
            <div>
              <p className="eyebrow">Selected work</p>
              <h2>Interfaces and systems, shown as they would be built.</h2>
            </div>
            <Link className="text-link" href="/work">All work</Link>
          </div>
          <p className="lede work-note">Every showcase is a concept or an internal demonstration and is labelled as such. No customer outcomes are claimed.</p>
          <div className="work-grid-home">
            {work.map((project, index) => (
              <article key={project.slug} className={`work-card${index === 0 ? " is-feature" : ""}`}>
                <Link href={`/work/${project.slug}`} className="work-card-visual" aria-label={`${project.title}: view the concept`}>
                  <ProjectPlate slug={project.slug} title={project.title} />
                </Link>
                <div className="work-card-copy">
                  <p className="kicker">{project.kindLabel} · {project.category}</p>
                  <h3><Link href={`/work/${project.slug}`}>{project.title}</Link></h3>
                  <p>{project.summary}</p>
                  <ul className="work-tags" aria-label="Services involved">
                    {project.services.slice(0, 2).map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rail-scene">
        <div className="wrap">
          <div className="reel-head">
            <div>
              <p className="eyebrow">How we work</p>
              <h2>Discovery to deployment, as one connected method.</h2>
            </div>
            <Link className="text-link" href="/company/our-approach">The approach</Link>
          </div>
          <MethodRibbon stages={homepageJourney.map((stage) => stage.title)} />
          <ProcessStory stages={homepageJourney} />
        </div>
      </section>

      <section className="capability-scene" id="capabilities">
        <div className="wrap">
          <div className="reel-head">
            <div>
              <p className="eyebrow">Supporting capabilities</p>
              <h2>Cloud, data, and security keep the product running.</h2>
            </div>
            <Link className="text-link" href="/services#capabilities">All capabilities</Link>
          </div>
          <div className="capability-grid-home">
            {capabilities.map((capability) => {
              const family = familyOf(capability.slug);
              return (
                <article key={capability.slug} className={`capability-card family-${family}`}>
                  <FamilyVisual family={family} variant={capability.slug} compact />
                  <div>
                    <h3><Link href={capability.path}>{capability.title}</Link></h3>
                    <p>{capability.result}</p>
                    <ul className="capability-links" aria-label={`${capability.title} specialist pages`}>
                      {capabilityDetails
                        .filter((detail) => detail.parent === capability.slug)
                        .map((detail) => (
                          <li key={detail.path}><Link href={detail.path}>{detail.title}</Link></li>
                        ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="systems-scene" id="solutions">
        <div className="wrap systems-grid">
          <div className="systems-column">
            <p className="eyebrow">Solutions</p>
            <h2>Complete systems, not single features.</h2>
            <p className="lede">Each solution connects several Alitroz capabilities around one business problem.</p>
            <ol className="systems-list">
              {solutions.map((solution, index) => (
                <li key={solution.slug}>
                  <Link href={solution.path}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{solution.title}</strong>
                    <em>{solution.result}</em>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
          <div className="systems-column" id="industries">
            <p className="eyebrow">Industries</p>
            <h2>Built around the constraints of the sector.</h2>
            <p className="lede">Regulation, data residency, settlement, and tenancy change the architecture. These pages explain how.</p>
            <ul className="sector-chips" aria-label="Industry pages">
              {sectorPreview.map((industry) => (
                <li key={industry.slug}><Link href={industry.path}>{industry.title}</Link></li>
              ))}
            </ul>
            <p className="gap-top-lg"><Link className="text-link" href="/industries">All industries</Link></p>
          </div>
        </div>
        <div className="wrap engage-band">
          <p className="eyebrow">Engagement models</p>
          <p className="engage-line">
            Five ways to work together, from a short discovery to ongoing support: {engagements.map((model) => model.title).join(", ")}.
            {" "}
            <Link className="text-link" href="/engagement-models">Compare all models</Link>
          </p>
        </div>
      </section>

      <section className="notes-scene">
        <div className="wrap">
          <div className="reel-head">
            <div>
              <p className="eyebrow">Insights</p>
              <h2>Technical notes from the work.</h2>
            </div>
            <Link className="text-link" href="/insights">All insights</Link>
          </div>
          <div className="notes">
            {insightPreview.map((article) => (
              <article key={article.slug}>
                <p className="kicker">{article.category}</p>
                <h3><Link href={`/insights/${article.slug}`}>{article.title}</Link></h3>
                <p>{article.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have something ambitious in mind?"
        body="Tell us what you are building. We will start with the business challenge, the right technical approach, and a clear path to a first release."
        label="Start a Project"
      />
    </div>
  );
}
