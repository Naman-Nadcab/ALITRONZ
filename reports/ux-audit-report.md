# Alitroz Technology — UX, interaction and responsive audit

Date: 5 November 2026. Branch `enterprise-site-expansion`. Local site `http://localhost:3000` (Next.js 16.4.2 dev server). Production origin remains `https://alitronz.com`.

This pass started from the clipped homepage category strip and then checked navigation, the enquiry form, and all 118 public routes for overflow, a missing H1, and page errors.

## Method

- Measured the homepage category strip and product-stack legend in headless Chrome at 1920, 1440, 1280, 1024, 768, 430, 390, 375 and 320.
- Opened the mobile drawer and the services disclosure, and submitted the enquiry form empty.
- Loaded every URL in `sitemap.xml` (118 routes) at 1440, 390 and 320. Recorded horizontal overflow, H1 presence, H1 clipping, and page errors. Result file: `/tmp/alz/ux-scan.json` (0 findings).

Pages were grouped by the existing route families (home, four divisions, specialist services, capabilities, solutions, industries, engagement models, work, insights, company, contact, start-a-project, privacy, terms). The automated pass covered every route. Visual inspection was concentrated on the hero, the mobile drawer, and the enquiry form, which is where the confirmed defects were.

## Findings

### UX-01 — Homepage division strip clipped at the first screen

- Severity: P0
- Routes: `/`
- Component: `.scene-line` inside `.home-next .scene`, styled in `app/globals.css`
- Defect: The four labels (AI & automation, Digital products, Web3 systems, Trading technology) sat past the bottom of a 900px and a 1080px viewport. A first-screen capture showed only the hairline above the words. On viewports where the line straddled the fold, the glyphs were cut in half.
- User impact: The primary service categories were not readable without scrolling, and a screenshot of the hero looked broken.
- Root cause: At widths from 800px, `.scene-stage` had `min-height: calc(100svh - var(--header-h) - 4.5rem)`. The category row is a sibling after that stage, so the stage consumed the viewport and pushed the labels outside it. A second rule, `.core-legend { position: absolute }`, laid the four layer cards over the installation, hiding the “Operations assistant” and phone panels.
- Correction: Remove the stage min-height. Keep the layer key in normal flow under a shorter installation (`clamp(280px, 34vh, 420px)`) from 800px up, in both the WebGL and fallback states. Give the category row 44px-tall links to the four division pages, at least 12.8px type, and padding so the glyphs are not on the section edge.
- Verification: At 1920×1080, 1440×900, 1280×800 and 1024×768 every label’s box is inside the viewport and the legend no longer overlaps the canvas. No horizontal overflow. Screenshot: the repaired 1440 hero shows all four labels and the uncovered installation.

### UX-02 — Mobile navigation drawer collapsed to one line

- Severity: P0
- Routes: every page, below the desktop nav breakpoint
- Component: `.nav-drawer` inside `.site-header` (`components/site-header.tsx`, `app/globals.css`)
- Defect: Opening the menu showed a thin bar with “Home”. The rest of the navigation was not a usable panel.
- User impact: On a phone, Services, Solutions, Industries, Work, Insights and About could not be reached from the menu.
- Root cause: `.site-header` set `backdrop-filter` and a fixed `height: var(--header-h)`. A filter on an ancestor makes `position: fixed` children position against that ancestor. The drawer’s `top` was also `var(--header-h)`, so its box height inside the header was effectively zero. The blur on `.site-header::before` is unaffected and still paints the bar.
- Correction: Remove `backdrop-filter` from `.site-header` itself.
- Verification: At 390×844 the drawer measures 768px tall, starts under the header, and lists Home, Explore, Services, Solutions, Industries, Our Work, Insights, About and Start a Project. Expanding Services reveals 55 links. Escape still closes the drawer (existing key handler).

### UX-03 — Enquiry form names the missing fields

- Severity: none (checked, not a defect)
- Route: `/start-a-project`
- Continuing with empty required fields shows “Enter your name.”, “Enter a valid email address.” and “Enter your company.”, and marks three controls `aria-invalid`. No change made.

## Checks that did not produce a defect

- 118 sitemap routes at 1440, 390 and 320: horizontal overflow 0, every page has an H1, no H1 crosses the viewport, no page errors.
- The category strip is not a marquee. There is no duplicated track and no scroll animation to pause. `prefers-reduced-motion` does not apply to it.
- Global `:focus-visible` remains in `app/globals.css`.

## Not changed, and why

- The homepage is still long below the hero. Shortening it further would remove the division diagrams the previous brief asked to keep. Severity if revisited: P3.
- There is still no monitored email or phone. That is an external dependency, not a layout defect.
- Insight articles still share one date; index cards already hide it.
- On phones the division links sit below the installation, so they are not on the first screen. They are fully visible once scrolled and are not clipped. The hero copy and both CTAs are on the first screen.

## Severity count

| Severity | Found | Fixed in this pass |
|----------|-------|--------------------|
| P0 | 2 | 2 |
| P1 | 0 | 0 |
| P2 | 0 confirmed | — |
| P3 | homepage length, noted only | not changed |
