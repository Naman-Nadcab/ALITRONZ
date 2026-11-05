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

## Evidence

- `reports/public-route-audit.json`: 118 sitemap routes, category totals, title/H1/description/canonical/link/content/visual checks.
- `reports/screenshots/index.html`: generated local contact sheet for all desktop routes and representative mobile routes.
- Browser review included homepage, AI service, fintech industry, concept project, and complete project-enquiry flow.
- Responsive width checks: 1280, 768, 390, and 320 pixels. The 390-pixel pass identified and repaired a table-of-contents overflow.
- No external visual assets were downloaded. All new graphics are procedural Three.js, SVG, HTML, or CSS.
