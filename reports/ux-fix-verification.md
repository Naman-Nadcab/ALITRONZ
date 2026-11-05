# UX fix verification

Date: 5 November 2026. Checked in headless Chrome against the local dev server after the corrections in this pass.

## UX-01 category strip and installation

| Viewport | All four labels inside the viewport | Legend overlaps the installation | Horizontal overflow |
|----------|--------------------------------------|----------------------------------|---------------------|
| 1920×1080 | yes (bottom edge 1056) | no | 0 |
| 1440×900 | yes (bottom edge 876) | no | 0 |
| 1280×800 | yes (bottom edge 776) | no | 0 |
| 1024×768 | yes (bottom edge 749) | no | 0 |

The labels are links to `/services/ai-automation`, `/services/digital-product-engineering`, `/services/web3-blockchain` and `/services/financial-trading-technology`. Each link is 44px tall. At 390 and 320 the same links are in a two-column grid below the installation; they are not clipped, and the page does not scroll sideways.

Before the change, at 1440×900 the label boxes started at y=911 in a 900px viewport, so the words were below the fold, and the layer cards covered the installation panels.

## UX-02 mobile drawer

At 390×844, after removing `backdrop-filter` from `.site-header`:

- Drawer box: top 76px, height 768px, opaque background.
- Header computed `backdrop-filter` is `none`. The bar blur remains on `.site-header::before`.
- Visible items: Home, Explore, Services, Solutions, Industries, Our Work, Insights, About, Start a Project.
- Opening Services lists 55 links.
- The drawer still closes on Escape and locks body scroll while open (unchanged handlers).

Before the change, the same control opened a sliver that showed only “Home”.

## Route sweep

`sitemap.xml` lists 118 routes. Each was loaded at 1440, 390 and 320. Findings: none (no horizontal overflow, no missing H1, no clipped H1, no page error).

## Enquiry form

Empty submit on `/start-a-project` at 390px reports the three required-field messages and sets `aria-invalid` on those fields. Delivery still depends on the enquiry provider credentials; a success state is not claimed without acceptance.

## Remaining

- Homepage length below the hero is unchanged.
- No public email or phone exists in the repository, so the form is still the only contact channel.
- These checks do not include a full manual read of all 118 pages or a new Lighthouse run. They do include a measured pass for the two P0 defects and an automated overflow/H1/error pass of every public route.
