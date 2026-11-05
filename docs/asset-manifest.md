# Visual asset manifest

Art direction: **Alitroz — Creative Engineering in Motion**. Every graphic on the site is generated in this repository from code. Nothing is downloaded, embedded, or hot-linked from a third party.

## Original repository assets

- **The Product Stack** — procedural Three.js installation of the four layers in every product Alitroz engineers (experience, application and AI, integration and APIs, data and infrastructure), with canvas-drawn interface panels and a DOM legend. Source: `components/three/core-canvas.tsx`, `components/three/alitroz-core.tsx`. Licence: owned with this project.
- **Product Stack fallback** — isometric SVG of the same stack, used for reduced motion, small screens, WebGL failure, and before hydration. Source: `components/three/core-fallback.tsx`. Licence: owned with this project.
- **System architecture diagrams** — seven labelled flow diagrams (AI, product, Web3, trading, cloud, data, security) with a per-page focus stage, a labelled "simulated UI" panel, and a compact two-column ladder variant for cards and narrow screens. Source: `components/visuals/family-visual.tsx` (`FamilyVisual`, `SystemFlow`, `WorkflowSpine`). Licence: owned with this project.
- **Concept interface plates** — SVG mock-ups of an assistant, embedded knowledge copilot (host ticket with a citation side panel), client portal, digital-asset console, platform architecture, dealing terminal, multi-market workstation (markets by source, adapter status, order log), SaaS administration, analytics dashboard, and observability view. Each of the ten project showcases has its own plate; none share a drawing. Every plate carries a visible "concept", "prototype", or "demonstration" label and shows simulated data only. Source: `components/project-plate.tsx`. Licence: owned with this project.
- **Project system views** — per-project layered system diagram (DOM/CSS, `.system-layers`) and the "What is real in this showcase" component register, which labels every component as proposed design, simulated in this showcase, or client-owned. Source: `content/project-systems.ts`, `components/project-view.tsx`. Licence: owned with this project.
- **Solution composition strip** — numbered, arrowed strip of the specialist services that compose each solution, generated from the solution's `related` links. Source: `components/offering-view.tsx` (`#composition`). Licence: owned with this project.
- **Method ribbon** — SVG path of the six-stage engineering method, used on the home page and `/company/our-approach`. Source: `components/visuals/method-ribbon.tsx`. Licence: owned with this project.
- **Engagement shapes** — SVG team-shape and cadence diagrams for the five engagement models (full version in each engagement hero, compact cadence strip on the index). Roles and steps are illustrative; nothing in them is a commitment. Source: `components/visuals/engagement-visual.tsx`. Licence: owned with this project.
- **Article system maps** — the compact architecture diagram for the family an article belongs to, with an explanatory note. Source: `components/article-cover.tsx`. Licence: owned with this project.
- **Alitroz Atlas** — original interactive SVG/DOM technology environment. Source: `components/atlas-canvas.tsx`. Licence: owned with this project.

## External visual assets

No stock photography, 3D models, HDRIs, textures, screenshots, or externally hosted graphics are used by the current implementation. The Three.js scene uses `RoomEnvironment` (procedural lighting generated at runtime from the three.js library, MIT licence); no HDRI file is shipped. No visual asset attribution is required.

## Fonts

Syne (display), Manrope (body and interface), and Instrument Serif (occasional accent) are loaded through the Next.js font integration. Their upstream open-font licences (SIL OFL) remain applicable.
