# Sonu Singh Portfolio

A static, mobile-first portfolio for network security, observability, and technical account management opportunities. The page keeps professional facts in `content/profile.ts` and derives the downloadable résumé from that same data.

## Local setup

Requirements: Node.js 20.9+ and npm.

```sh
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. Leave `NEXT_PUBLIC_FORMSPREE_FORM_ID` empty while previewing; direct email and social links remain available. For the native message form, create a Formspree form and put its form ID in `.env.local` (the value after `/f/` in its endpoint). The browser checks required fields and Formspree handles its confirmation response. Set `NEXT_PUBLIC_SITE_URL` to the final canonical domain before building. `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is optional and analytics is not loaded until configured.

Optional Cloudflare Pages analytics counts aggregate page loads and résumé download clicks. Configure the D1 database and owner access key using the steps in [`DEPLOYMENT.md`](DEPLOYMENT.md); the public count badge stays off unless explicitly enabled.

## Update profile content

Edit the typed data in [`content/profile.ts`](content/profile.ts). It powers the visible page, contact links, Person structured data, metadata, sitemap and résumé PDF. Keep dates and claims tied to verified source records. Phone is intentionally omitted. Add a photo only after supplying an approved image and alt text. The current source dates for Helloclass and Barracuda overlap; verify those dates before changing them.

## Regenerate résumé

The same profile data creates `public/resume.pdf` and the social preview PNG as part of every production build. To regenerate the résumé after a content change:

```sh
npm run resume:build
```

The downloadable file is `public/resume.pdf`. It is generated with PDFKit from the typed profile; do not hand-edit the PDF.

Regenerate the Open Graph/Twitter image with `npm run social:build`; it reads the same profile file and writes `public/social-card.png`.

## Build and preview

```sh
npm run build
npm run preview
```

The static site is written to `out/`. `npm run preview` serves that output locally. Static export keeps this project compatible with Vercel and Cloudflare Pages. The contact form posts to Formspree and requires a form ID; no server secrets are stored in the repository.

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for host setup and [`FINAL-CHECKLIST.md`](FINAL-CHECKLIST.md) for verification results and remaining owner tasks.

## Design and component credits

Three React Bits components are used sparingly: BlurText, SpotlightCard, and a reduced-motion/touch-aware magnetic link based on Magnet. Upstream sources and license notes are in [`components/react-bits/README.md`](components/react-bits/README.md). The visual direction was reviewed against Taste Skill and Impeccable guidance: content first, distinctive type, restrained colors, clear hierarchy, and a final critique/polish pass.
