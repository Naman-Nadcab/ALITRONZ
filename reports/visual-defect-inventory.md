# Alitroz visual defect inventory

Reviewed against the rendered local site at desktop and responsive widths on 5 November 2026. This inventory records the starting defects verified in-browser and the implemented response. It is not a design score.

## Site-wide

| Verified defect | Affected families | Implemented response | Status |
| --- | --- | --- | --- |
| One dark-purple atmosphere dominated most sections. | All | Retained the indigo base but introduced family-specific lavender, cyan, blue, coral, lime, and teal lighting; pointer and scroll lighting remain motion-aware. | Repaired |
| Section changes were mostly background changes rather than narrative transitions. | Home and detail pages | Added layered spatial lighting, foreground planes, family colour boundaries, alternating editorial structures, and distinct project/industry treatments. | Repaired |
| Repeated raised panels made unrelated content families feel alike. | Home, services, solutions, industries, work | Replaced the four homepage service cards with large alternating technology environments. Added kind- and family-specific detail compositions and a 12-column project narrative. | Repaired |
| Mobile on-page navigation expanded the document width. | Service, solution, engagement, capability pages | Constrained the document grid and horizontal table-of-contents rail. Verified body width equals 390, 320, and 768 pixel viewports. | Repaired |

## Homepage

| Verified defect | Missing or weak element | Implemented response | Status |
| --- | --- | --- | --- |
| The hero object read as a faceted globe with orbital rings. | Memorable industrial silhouette, foreground/middle/background separation | Removed the spherical mass and orbital rings. Built asymmetric interlocking chrome beams, transmissive blades, suspended slabs, three luminous paths, side architecture, and a matching non-WebGL fallback. | Repaired |
| “Four ways in” remained a repeated card grid. | Division-scale product environments and direct specialist routes | Rebuilt it as four full-width environments with alternating composition, dedicated art, family materials, specialist links, and division entry points. | Repaired |
| The capability universe was a thin path map. | Spatial foreground, middle ground, structures, and stronger palette response | Added monoliths, perspective horizon, foreground platform, atmosphere, selected-path lighting, contextual links, and retained DOM controls. | Improved; keep under screenshot review |
| Supporting capabilities, solutions, and industries looked like three similar link panels. | More distinct editorial hierarchy | Kept concise route discovery but strengthened the preceding systems narrative and family environments. | Acceptable; lower-priority future refinement |
| Primary CTA wording differed from the brief. | Exact “Explore the Experience” label | Updated. | Repaired |

## Service and capability pages

| Verified defect | Missing or weak element | Implemented response | Status |
| --- | --- | --- | --- |
| Long pages shared one visual rhythm. | Family-specific atmosphere and differentiated content blocks | Added family accent systems, alternating architectural blocks, kind-specific hero ratios, richer diagrams, sticky content navigation, and non-card editorial boundaries. | Repaired |
| Architecture diagrams were small and repeated. | Page-relevant system artwork | Seven original visual families now cover AI, product, Web3, finance, cloud, data, and security; each family has its own architecture labels and workflow. | Repaired at family level |
| Content risked becoming generic marketing copy. | Problem, deliverables, workflows, trade-offs, boundaries, FAQs, related routes | Verified these structures across the data-backed detail template and the 118-route audit. | Repaired |

## Solutions and engagement models

| Verified defect | Missing or weak element | Implemented response | Status |
| --- | --- | --- | --- |
| Solutions inherited the same service proportions. | More system-led composition | Solution heroes now allocate more space to the system visual and include an additional flow directly after the problem framing. | Repaired |
| Engagement pages looked like technical service pages. | More advisory/editorial hierarchy | Engagement heroes now privilege the written proposition and use a narrower visual field while preserving substantive delivery detail. | Repaired |

## Industries

| Verified defect | Missing or weak element | Implemented response | Status |
| --- | --- | --- | --- |
| Industry pages were linear documents with repeated cards. | Sector-specific atmosphere and staggered narrative | Assigned each industry to a relevant visual family, added staggered section widths, alternating material treatments, workflows, architecture, engagement start, truthful boundary, and concept evidence. | Repaired |

## Work and project details

| Verified defect | Missing or weak element | Implemented response | Status |
| --- | --- | --- | --- |
| Project heroes reused generic family visuals. | Project-specific cinematic artwork | Project details now render the project’s original SVG plate with an explicit concept/internal-demonstration caption. | Repaired |
| Project narratives were one full-width stack. | Case-study pacing | Introduced a 12-column editorial structure with paired context sections and full-width workflows/evidence where appropriate. | Repaired |
| Concept status could be overlooked. | Clear disclosure | Preserved the prominent concept disclosure, kind label, limitations, and no-outcome language. | Verified |

## Insights, company, contact, and legal

| Verified defect | Missing or weak element | Implemented response | Status |
| --- | --- | --- | --- |
| Insights needed a recognisable editorial identity. | Reading hierarchy rather than service-page styling | Preserved article-specific narrow measure, metadata, contents navigation, article pager, related reading, and a chromatic editorial rule. | Verified |
| Company/contact/legal pages need clarity more than visual spectacle. | Restrained family variation and complete information | Preserved their simpler editorial composition and navigation. They remain included in the automated route, metadata, and link review. | Verified |

## Evidence (atelier round)

- `reports/public-route-audit.json`: 118 sitemap routes, category totals, title/H1/description/canonical/link/content/visual checks.
- `reports/screenshots/index.html`: generated local contact sheet for all desktop routes and representative mobile routes.
- Browser review included homepage, AI service, fintech industry, concept project, and complete project-enquiry flow.
- Responsive width checks: 1280, 768, 390, and 320 pixels. The 390-pixel pass identified and repaired a table-of-contents overflow.
- No external visual assets were downloaded. All new graphics are procedural Three.js, SVG, HTML, or CSS.

---

# Round 3 — "Creative Engineering in Motion" (5 November 2026)

Baseline verified from full-page captures of the previous build before any edit. Each row records what was wrong, what replaced it, and how it was checked.

## Baseline defects confirmed before editing

| Verified defect | Where | Implemented response | Status |
| --- | --- | --- | --- |
| Monotone navy-purple atmosphere; one gradient family for every section. | Site-wide | New token palette (deep, indigo, plum, blue-slate, violet, lavender, cyan, teal, blue, coral, amber, lime). Seven family colour environments (AI violet/cyan, Product blue/coral, Web3 teal/violet, Finance cobalt/coral, Cloud blue/cyan/mint, Data violet/lime, Security indigo/mint) applied to heroes, territories, cards and diagrams. | Repaired |
| Abstract hero sculpture did not explain what the company builds. | Home hero | Replaced with "The Product Stack": a procedural Three.js installation of the four layers in every product (experience, application and AI, integration and APIs, data and infrastructure) with drawn interface panels, a DOM legend naming each layer, a caption, and a matching isometric SVG fallback. | Repaired |
| Architecture diagrams were decorative, with labels rendered at 6–8 px. | All family visuals | Rebuilt as labelled flow diagrams (800×540): numbered stages with a title and two explanatory lines, directional connectors, a simulated interface inset, a "FOCUS" marker for the stage the current page is about, and a written caption. Node labels render at ~13 px at 1440. A compact two-column ladder variant is used for cards and automatically on screens under 800 px so labels never shrink below ~12 px. | Repaired |
| Project plates were abstract shapes rather than product interfaces. | Work, home, project pages | Eight realistic concept interfaces (assistant, portal, console, architecture, dealing terminal, admin, analytics, observability) with window chrome, simulated data and a visible "concept / prototype / demonstration · simulated" label; the terminal carries "SIMULATED FEED · NO LIVE VENUE · NOT A BROKERAGE". | Repaired |
| Serif display type on nearly every heading; hero wrapped to five lines. | Site-wide | Syne for h1/h2, Manrope for interface and body, Instrument Serif retained only as `.serif-accent`. Hero 60–66 px wrapping to four lines at 1440 with a 15ch measure; section h2 44–58 px; labels ≥ 12 px. | Repaired |
| Repetitive identical cards for divisions, capabilities, solutions, industries. | Home | Divisions are four full-width environments with headline, result, "We deliver / You keep" facts, specialist links and their own architecture diagram. Capabilities are three tinted cards with compact diagrams. Solutions and industries are numbered editorial lists. Engagement models are a five-up comparison strip. Selected work is a feature-plus-three plate grid. | Repaired |
| Methodology shown only as text. | Home | Added the Method Ribbon (six labelled stations on a gradient path) above the scroll-driven process story; ribbon hidden under 800 px where the story alone is clearer. | Repaired |
| Service detail pages lacked at-a-glance facts and sibling navigation. | 45 service and 18 capability routes | Added a hero facts strip (part of / result / concept showcase), the `SystemFlow` now marks the page's own stage ("This page"), and an "Other … services" grid links every sibling specialist page. | Repaired |
| Solutions index duplicated the stage list beside a cropped diagram. | /solutions | Full diagram per solution with result and four related routes. | Repaired |
| Industries index was a plain text list. | /industries | Sector cards with the sector's compact system diagram, systems engineered, the truthful boundary statement and a direct link. | Repaired |
| Engagement index rows were title + sentence only. | /engagement-models | Each row now shows "You receive / Best when / Boundary". | Repaired |
| Article covers were random abstract line art. | 13 insights + index | Replaced with the compact system map for the article's family and an explanatory note. | Repaired |
| Hero 3D cost: three transmissive physical materials compiled on the main thread at load. | Home | Removed transmission; non-glass meshes use standard materials; shaders are compiled asynchronously (`compileAsync`) before the first frame; the canvas mounts after `load` + idle; software rasterisers and low-memory devices get the SVG fallback. Lighthouse desktop TBT fell from 3,250 ms to 490 ms. | Improved |
| Low-contrast 12 px stage labels (#866CFF on #2B3150, 3.4:1). | Detail pages | Labels mixed 60 % towards white; diagram numerals rendered in light grey beside a coloured bar. | Repaired |

## Independent creative-director audit (round 3) — triage and resolution

An independent review of the round-3 captures returned 40 items. Each was checked against the page and the source before any change.

| # | Finding | Severity | Resolution |
| --- | --- | --- | --- |
| 1 | Hero duplicated mid-page in mobile full-page captures. | P0 | Capture artefact: Chromium truncates full-page captures above 16 384 px. Scroll-slice captures showed no duplication. `capture-public-routes.mjs` now captures documents over 15 000 px in segments (`--partN.jpg`). |
| 2 | Terms, privacy, careers and contact copy read as placeholders ("legal name not published", "no address published", "not advertising roles"). | P0 | Rewritten as plain statements: contracting entity and governing law are set in each services agreement; empty identity fields now render nothing instead of an apology; careers page states how hiring works and how to reach us. No entity, address, jurisdiction or role was invented. |
| 3 | Footer: one "Company" column mixed 14 links including legal and engagement pages. | P0 | Regrouped into Services / Capabilities / Industries / Working with us / Company (≤ 8 links each); Privacy and Terms moved to the base row. Six columns at ≥ 1100 px. |
| 4 | Simulated-interface insets inside the diagrams were illegible (7–9 px text, overlapping chart). | P0 | Replaced with one legible panel per family: title ≥ 12.5 px, a 26 px readout, a support line, a status pill and a "SIMULATED UI" tag; a narrow variant for the 7-stage diagrams. |
| 5 | Hero h1 reached five lines under 480 px. | P1 | Font reduced to `clamp(2.1rem, 9.6vw, 2.6rem)` below 480 px; four lines at 390 and 320. |
| 6 | Method ribbon numerals clipped at the bottom edge; process steps at 55 % opacity. | P1 | ViewBox height 236 with a recentred baseline; step opacity ≥ 0.82; the sticky duplicate stage list is removed and steps read as a 2/3-column grid. |
| 7 | SystemFlow arrows dangled at the end of wrapped rows; caption lower-cased proper labels and always said "service". | P1 | Fixed 3/4-column grids with `nth-child` arrow suppression; caption keeps the label's case and uses the page's noun (service, capability, solution, engagement model). |
| 8 | Capability pages breadcrumbed as "Services". | P1 | Breadcrumb now "Capabilities" linking to `/services#capabilities`. |
| 9 | Industry and solution diagrams repeated the same focus. | P1 | Focus stages added for all seven industries; the two product solutions already pointed at different stages. |
| 10 | Engagement pages reused a product architecture diagram that says nothing about the engagement. | P1 | New `EngagementVisual`: team shape (Alitroz side / your side), cadence steps and a written boundary, plus a compact cadence strip on each index row. |
| 11 | Sector cards alternated 0.9/1.1 fr so diagrams changed size row to row. | P1 | Equal 1fr/1fr columns. |
| 12 | Eyebrows and kickers under 12 px; `--violet-deep` (#4C3FD4) labels failed contrast on dark surfaces. | P1 | All label classes ≥ 12 px; token remapped to lavender (#B5A4FF); error/ok tokens lightened. |
| 13 | Work index cards used a 220 px plate; project hero plate was small; tags duplicated ("Financial and Trading Technology" twice). | P1 | Feature + two-up grid with full-width plates; project hero is 0.9/1.1 fr in favour of the plate; tags de-duplicated on a normalised key. |
| 14 | Article "Related" section sat flush under the body. | P1 | Spaced and ruled "Related articles" section. |
| 15 | Company pages ran to ~110 ch; approach page had no visual. | P1 | 72 ch measure on long-form blocks; Method Ribbon added to "The sequence". |
| 16 | Desktop nav links and menu buttons had different baselines; CTA had no active state. | P1 | Shared metrics for `.nav-link`/`.menu-button`; `aria-current` on the CTA on `/start-a-project`. |
| 17 | Insight card heights uneven; services capability diagrams at three different heights; fallback mini-panels unreadable under 480 px; TOC scroller cut off without a cue; capability cards three-up on tablet. | P2 | Two-column list with equal rows; equal columns and a fixed diagram aspect box; panels hidden under 480 px; mask fade on the TOC scroller; two columns from 800 px, three from 1100 px. |
| 18 | Lighthouse a11y on service pages: focus-stage numeral 4.33:1; search button name mismatch. | P1 | Focus numeral uses full text colour; search button's accessible name is now its visible text ("Search", shortcut hidden from AT). |

Reported but intentionally not changed (design or content decisions for the owner): merging `/contact` with `/start-a-project`; merging small insight categories; filling the empty right half of index heroes; the "Explore" nav item; the boxed/unboxed rhythm of the work section.

## Measured results (local production build, Chrome headless `--headless=new`, 5 November 2026, after audit repairs)

- Route audit: 118 routes, 118 unique titles, 0 duplicate H1s, 0 broken internal targets, 0 broken assets, sitemap and robots valid.
- Screenshots: 118 desktop full-page captures at 1440 (home captured in two segments because it exceeds 15 000 px) + 13 representative routes at 1280, 768, 390 and 320 (52 captures); 0 horizontal overflows; 0 console errors. Contact sheet at `reports/screenshots/index.html`.
- Lighthouse home, desktop preset: performance 0.97, accessibility 1.00, best practices 1.00, SEO 1.00; LCP 1.0 s, CLS 0, TBT 130 ms.
- Lighthouse home, mobile (simulated slow 4G): performance 0.85, accessibility 1.00, best practices 1.00, SEO 1.00; LCP 4.0 s, CLS 0, TBT 180 ms.
- Lighthouse `/services/ai-agent-development`, desktop: performance 0.99, accessibility 1.00, best practices 1.00, SEO 1.00.
- TypeScript, ESLint, and 26 Vitest tests pass; `next build` generates 126 static pages.
- Earlier in the round (before the audit repairs) the same home page measured 0.78 desktop / 0.70 mobile with TBT 490 ms / 620 ms; the difference comes from the 3D hero changes (no transmission, async shader compile, deferred mount) and the audit-round CSS, measured in the same local environment. Scores vary between runs and machines and are not a production guarantee.
