# Alitroz Technology

Marketing site for Alitroz Technology, an AI-native product engineering and digital infrastructure company. The site presents software development and consulting. It does not present Alitroz as a broker, exchange, custodian, or investment adviser.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

The install uses `legacy-peer-deps` because React Three Fiber declares optional React Native peers that trip a bug in npm’s dependency resolver. The setting is in `.npmrc`.

## Enquiry delivery

The project form at `/start-a-project` and `/contact` posts to `POST /api/enquiry`.

The form validates in the browser and again on the server. It includes a honeypot, an origin check, and an in-memory rate limit of 8 requests per 30 minutes per address. The rate limit is per server instance. It is not a shared store, so it will not hold on multiple instances.

A submission is reported as received only after the configured channel accepts it.

Configure one channel in the environment. Copy `.env.example` to `.env.local`. Never commit real secrets.

1. **Resend.** Set `RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL`, and `ENQUIRY_TO_EMAIL`. The from-address must be on a domain you verify with Resend. The to-address is the internal inbox. Resend is used when all three are set, even if a webhook is also set.
2. **Webhook.** Set `ENQUIRY_WEBHOOK_URL` to an `http` or `https` endpoint. The site posts the enquiry JSON. Set `ENQUIRY_WEBHOOK_SECRET` if the endpoint should receive `Authorization: Bearer <secret>`.

If neither channel is complete, the API returns `503` with `not_configured` and the form says the enquiry was not sent.

File upload is intentionally absent. There is no private storage target. Ask people to describe reference material in the brief.

Public contact details are optional and must be real:

- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_LEGAL_NAME`
- `NEXT_PUBLIC_COMPANY_ADDRESS`
- `NEXT_PUBLIC_COMPANY_REGISTRATION`
- `NEXT_PUBLIC_JURISDICTION`

Leave them blank rather than inventing them. Rebuild after changing any `NEXT_PUBLIC_` value. Server delivery variables are read when an enquiry is submitted.

## Site URL

Canonical URLs, Open Graph URLs, structured data, `robots.txt`, and `sitemap.xml` use `https://alitronz.com` unless `NEXT_PUBLIC_SITE_URL` overrides that origin. The override must be an absolute `http` or `https` URL with no trailing slash. DNS, certificates, and Search Console are not configured by this repository.

## Legal review still required

The privacy policy and terms describe how this website actually behaves. They do not name a registered entity, address, or governing law unless those values are configured. Have counsel review both pages before production, and add the provider name and region for enquiry delivery if your jurisdiction requires that disclosure.

## Work and brand

Published projects are concept showcases. Do not relabel them as customer work without a verified engagement. The logo is a wordmark in `components/logo.tsx` and a typographic “A” icon. Replace both with the final brand asset when you have one.

## 3D

The homepage hero, The Alitroz Core, is procedural Three.js geometry rendered with React Three Fiber. It does not load an external model. Reflections use Three.js `RoomEnvironment`. The canvas is client-only, paused when off-screen, and not mounted for small screens, reduced motion, or browsers without WebGL. Those cases get a static SVG. Navigation, copy, and forms do not depend on the canvas.

`@react-three/drei` is not included. The scene does not need its helpers or remote environment files.
