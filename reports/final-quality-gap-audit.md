# Alitroz Technology — final international quality gap audit and improvement

Date: 5 November 2026. Branch `enterprise-site-expansion`, starting commit `dabd404`.
Scope: the full public site (118 routes) as served by a local production build (`next build` + `next start`, Next.js 16.4.2).
Method: (1) verified the current state with the route audit, full-page captures of every route at 1440 and of representative routes at 1280 / 768 / 390 / 320, Lighthouse, typecheck, lint and tests; (2) commissioned an independent creative-director / front-end QA pass over the captures and source (round 4, findings reproduced in §2); (3) remediated every confirmed finding that does not depend on information only the company can supply; (4) re-ran the full regression and recaptured the evidence.

This was not a redesign. The visual system, the honesty labelling, the seven family diagrams, the concept plates, the engagement visuals and the detail-page skeleton were kept. The work below removes defects and adds depth where pages were thin.

## 1. What was good and has been preserved

- The honesty system: "Concept showcase · simulated data", "Illustrative system · not a client deployment", simulated-feed labels on every trading screen, and the boundary statements (not a broker, exchange, custodian or adviser) on finance, Web3 and healthcare pages.
- The concept plates' drawing style: legible 12–14 px type, realistic states, consistent chrome.
- Hero typography and layout at every width; two CTAs above the fold; four-line h1 on phones.
- `EngagementVisual` (Alitroz side / your side, cadence chips) on the engagement index and heroes.
- The detail-page skeleton (Problem → Where it is used → What we build → Deliverables → Architecture → Integrations → Delivery → Quality → Questions → siblings → related) with the sticky "On this page" rail.
- Footer regrouping, breadcrumbs on detail pages, zero horizontal overflow, zero console errors, Lighthouse accessibility 100.

## 2. Findings by dimension, correction and verification

Severity: Critical / High / Medium / Low. "Verified" means the correction was confirmed in a capture of the final production build or by a measurement recorded in `reports/`.

| # | Dimension | Finding (routes) | Severity | Correction | Status |
|---|-----------|------------------|----------|------------|--------|
| 1 | Brand identity | Hero eyebrow "CREATIVE ENGINEERING STUDIO" contradicted the company and footer description (`/`) | Low | Eyebrow now "Alitroz Technology / Software development and consulting" | Verified (`reports/screenshots/desktop/home.jpg`) |
| 2 | Colour depth per family | Family colour stopped at the hero; the body of every detail page was flat navy (all `/services/*`, `/capabilities/*`, `/solutions/*`) | Medium | Family accent carried below the hero: h2 rule, deliverable card border, delivery numerals, block separators, TOC hover, system-flow focus (`.detail-page` rules in `globals.css`) | Verified (`services--ai-agent-development.jpg`, `services--trading-terminal-development.jpg`) |
| 3 | Typography | Architecture-section `SystemFlow` squeezed into a half-width column: stage labels clipped, one-word-per-line descriptions, pill over title (~70 detail pages) | High | Split removed; architecture text stacked above a full-width flow | Verified (round 3 fix, re-checked in this build) |
| 3b | Typography | Industry boundary notes rendered at ~11 px (`/industries`) | Low | Minimum 0.94rem | Verified |
| 4 | Homepage composition | Home repeated the index pages in full (15 k px desktop, 26 k px at 320); divisions carried a second caption that duplicated the diagram labels; legend cards covered the installation on laptop widths | High | Division captions dropped; industries reduced to a chip list; engagement strip replaced by a one-line note with a link; legend placed below the installation between 800 and 1439 px | Verified. Desktop home is now ~14.5 k px (from 15.0 k; still long because each division keeps its explanatory diagram). 390 px ≈ 20.4 k px (from 23.5 k); 320 px ≈ 22.5 k px (from 26.1 k). |
| 5 | 3D art | Legend collided with the installation panels at 1280–1439 (`/`) | High | Legend static below the stage at those widths; the Three canvas and SVG fallback are given the same explicit height so the WebGL/fallback swap no longer moves the layout (measured CLS 0 at 1280, 1350, 1440) | Verified (`reports/screenshots/laptop/home.jpg`, Lighthouse desktop CLS 0) |
| 6 | Service-specific graphics | Every service in a family showed the identical diagram and simulated-UI panel | High | Panel copy is now generated per page from that page's `builds` and `deliverables` (`panel` prop on `FamilyVisual`); industries pass their own systems; inset title is width-fitted so long titles no longer collide with the "SIMULATED UI" badge | Verified (`services--trading-terminal-development.jpg` vs `services--forex-crm-development.jpg`; `industries--fintech.jpg`) |
| 7 | Mockup quality | Two project pairs shared one plate (assistant ×2, terminal ×2) (`/work`, `/`) | Critical | New `copilot` plate (host ticket + citation side panel, draft-only write-back) and `workstation` plate (markets by source, adapter status, order log); generic sample names only | Verified (`work.jpg`, `work--enterprise-ai-knowledge-copilot.jpg`, `work--multi-market-trading-workstation.jpg`) |
| 8 | Diagram clarity | Second row of the 7-stage diagram read right-to-left | Medium | Second row now left-to-right with an explicit down-connector from stage 04 | Verified |
| 9 | Page-family differentiation | Solutions used the service template unchanged; engagement bodies showed a product-architecture flow | High | Solutions open with a numbered "How this solution is composed" strip of their constituent services (TOC entry "Composition"); engagement pages drop the product flow and title the section "How the engagement runs"; `/solutions` index uses compact diagrams without captions; service and capability pages gained "Part of these solutions" | Verified (`solutions--enterprise-ai-automation.jpg`, `engagement-models--dedicated-teams.jpg`, `solutions.jpg`) |
| 10 | Portfolio credibility | "Concept showcase" label applied to non-concepts (10 capability/engagement entries); all 13 insights showed the same date on every card | Medium | Non-work targets labelled by their real noun ("Related page", "Solution", "Approach"); dates removed from index cards and the home strip (kept in article pages and structured data) | Verified (`capabilities--penetration-testing.jpg`, `insights.jpg`) |
| 10b | Portfolio credibility | Project pages did not explain the proposed system, what was simulated, or client-owned parts | High | `content/project-systems.ts`: layered system view, component register with proposed / simulated / client-owned status, workflows, limitations, security notes and service links for all 10 projects | Verified (`work--*.jpg`) |
| 11 | Navigation | Nav "What We Do" vs breadcrumb/footer "Services"; index pages had no breadcrumb; header CTA missing on tablet | Low–Medium | Label unified to "Services"; one-level breadcrumbs on all ten index pages (with BreadcrumbList JSON-LD); compact "Start a Project" kept in the bar from 640 px | Verified (`tablet/solutions--enterprise-ai-automation.jpg`) |
| 12 | High-ticket enquiry | Stepper gave no preview of steps 2–3 or time required; no alternative channel | High | Preview copy under the stepper (fields, ~2 minutes, draft kept in the tab). **Alternative channel not added**: no monitored email, phone or calendar exists in the repository and inventing one is prohibited (see §7) | Partially verified (`start-a-project.jpg`); remainder is an external dependency |
| 13 | Accessibility / responsive | Mobile footer ~1 600 px; atlas map labels illegible under 480 px; hero overlap at 768 on solution/engagement pages | Medium | Footer groups collapse into disclosures below 800 px; atlas stage hidden below 480 px (chip list kept); two-column hero grids scoped to ≥1100 px | Verified (`mobile/start-a-project.jpg`, `small/home.jpg`, `tablet/solutions--enterprise-ai-automation.jpg`) |
| 14 | SEO / internal linking | Industry heroes had no CTAs; service pages never linked to the solutions they belong to | Low | CTA pair on industry heroes; "Part of these solutions" section on services and capabilities | Verified |
| 15 | Performance | Mobile home LCP 4.0 s | High | Root cause found and fixed: (a) the `app/loading.tsx` Suspense boundary made React outline every large static page as a hidden segment at the end of the HTML, so the hero could not paint until the whole document arrived — boundary removed; (b) the client header imported `content/navigation.ts`, which pulled the whole offerings catalogue (~300 KB raw) into the client bundle — nav data is now passed as props from the server layout. Initial JS on the home page fell from ~250 KB to ~164 KB transferred. | Verified: mobile home 78 → 94 (LCP 3.8 → 3.0 s), desktop home 90 → 100 (CLS 0.138 → 0) |

Items considered and deliberately not changed: the "Explore" primary-nav item (owner decision from round 3); the full-width division diagrams on the home page (the brief asked to keep the divisions explanatory); the hero installation style (WebGL scene mounts in production Chrome; the SVG fallback is used only without WebGL, under reduced motion or below 800 px).

## 3. Pages improved

- All 45 service, 18 capability and 7 solution detail pages: per-page simulated-UI panel copy; family accent below the hero; "Part of these solutions"; width-fitted panel titles.
- All 6 solution pages: composition strip and TOC entry.
- All 5 engagement pages: product flow removed; "How the engagement runs".
- All 7 industry pages: own panel copy, hero CTA pair.
- All 10 project pages: proposed system, component register, workflows, limitations, security, service links.
- 10 index pages: breadcrumbs; `/solutions` compact diagrams; `/insights` and home cards without the repeated date.
- Home: shorter sections, stable laptop hero layout, consistent eyebrow.
- Enquiry pages: step preview.
- Five previously one-line FAQ answers expanded (financial API licensing, disaster-recovery insurance, application-security certification, system-integration vendor access, "who accepts production?").

## 4. Graphics created or upgraded

- New `copilot` and `workstation` concept plates (`components/project-plate.tsx`).
- `FamilyVisual` panel prop and width-fitted inset title; left-to-right second row.
- Project system layers and component register (`content/project-systems.ts`, `components/project-view.tsx`).
- Solution composition strip (`#composition`).
- Laptop-width hero layout that is stable across the WebGL/fallback swap.
- `docs/asset-manifest.md` updated; all assets remain original and generated in the repository.

## 5. SEO corrections

- Breadcrumbs with BreadcrumbList JSON-LD on all index pages (detail pages already had them).
- Internal topical links: services/capabilities → solutions ("Part of these solutions"); solutions → constituent services (composition strip); industries → enquiry and work.
- Route audit on the final build: 118 routes, 0 duplicate titles, 0 duplicate H1s, 0 broken internal targets, 0 broken assets, sitemap and robots valid (`reports/public-route-audit.json`). Canonical origin remains `https://alitronz.com`.

## 6. Conversion and trust improvements

- Step preview and time expectation on the enquiry form; draft persistence stated truthfully (sessionStorage, cleared on submit).
- Industry pages gained the standard CTA pair.
- Header CTA retained on tablets.
- Submission states unchanged (already truthful: success only on a confirmed server response; configuration gaps surfaced as a clear message).

## 7. Outstanding external dependencies (not invented)

- Legal entity name, registered address and jurisdiction for the legal pages and Organization schema.
- A monitored contact email and/or phone (`identity.email` is empty; the mailto branches never render).
- Enquiry delivery provider credentials for the form's server route.
- Real publication dates for the 13 insights (all currently share one date; the date is hidden on index cards until individual dates exist).
- Any certifications, client names, metrics or testimonials — none are claimed anywhere on the site.

## 8. Measured results (final production build, Chrome headless `--headless=new`, Lighthouse 12.8.2, 5 November 2026)

| Page | Mode | Performance | Accessibility | Best practices | SEO | LCP | FCP | CLS | TBT |
|------|------|-------------|---------------|----------------|-----|-----|-----|-----|-----|
| `/` | desktop | 100 | 100 | 100 | 100 | 0.7 s | 0.4 s | 0 | 60 ms |
| `/` | mobile | 94 | 100 | 100 | 100 | 3.0 s | 1.4 s | 0 | 60 ms |
| `/services/ai-agent-development` | desktop | 100 | 100 | 100 | 100 | 0.6 s | 0.3 s | 0 | 0 ms |
| `/services/ai-agent-development` | mobile | 96 | 100 | 100 | 100 | 2.7 s | 1.2 s | 0 | 110 ms |

Before this round (same build settings): home desktop 90 (CLS 0.138), home mobile 78 (LCP 3.8–4.0 s). Raw reports: `reports/lighthouse-home.json`, `reports/lighthouse-home-mobile.json`, `reports/lighthouse-service.json`, `reports/lighthouse-service-mobile.json` (gitignored, kept locally).

Responsive: zero horizontal overflow on all 118 desktop captures and all 52 representative captures at 1280 / 768 / 390 / 320 (`reports/screenshots/manifest.json`, `overflows: 0`). Layout-shift measurement at 1280, 1350 and 1440 with WebGL active: 0.

## 9. Tests and build

- `tsc --noEmit`: pass.
- `eslint .`: pass, no warnings.
- `vitest run`: 7 files, 26 tests, pass.
- `next build`: success; 118 public routes prerendered (home and all content routes static; `/start-a-project` dynamic for the service query parameter).
- `npm run audit:routes`: 118/118, 0 failures.
- `npm run audit:screenshots`: 118 desktop + 13 mobile + 52 responsive captures, 0 failures, 0 overflows.

## 10. Git

See the commit on `enterprise-site-expansion` that follows `dabd404`; the push was verified against the remote before this report was finalised. Screenshots and Lighthouse JSON remain gitignored evidence.
