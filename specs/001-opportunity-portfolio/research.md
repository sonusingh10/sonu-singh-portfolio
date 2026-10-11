# Research Notes

**Feature**: Sonu Singh Opportunity Portfolio  
**Date**: 2026-10-11

## Decisions

### Static Next.js export

- **Decision**: Use Next.js App Router with `output: "export"`, and write generated assets to `out/`.
- **Rationale**: The site is a content-first portfolio and needs the same portable static artifact on both named hosts. Next.js documents static HTML export; Vercel supports Next.js projects directly. Cloudflare's current Next.js server-rendering path is Workers/OpenNext, but the exported static files can be served by Pages without that adapter.
- **Alternatives considered**: Cloudflare Workers/OpenNext would add a runtime adapter without a feature needing server rendering. Vercel-only serverless contact handlers would reduce portability.
- **References**: [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports), [Cloudflare Next.js guidance](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/), [Vercel Next.js](https://vercel.com/docs/frameworks/nextjs).

### Contact delivery

- **Decision**: Use a browser-side Formspree POST configured with a public form ID, plus direct social links. Hide the form until its ID exists. Add `mailto:` only when an email is supplied.
- **Rationale**: This works with a static export and does not put a private API key in browser code. Form delivery cannot be activated until Sonu creates/configures the form endpoint.
- **Alternatives considered**: Resend requires a server-side function and secret, which breaks the single static artifact unless a provider-specific backend is added.
- **References**: [Formspree HTML Forms](https://help.formspree.io/hc/en-us/articles/360055613373-HTML-Forms), [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports).

### Profile content and résumé

- **Decision**: Keep the authoritative facts in `content/profile.ts`. Generate `/public/resume.pdf` with a small TypeScript script that imports this data.
- **Rationale**: This avoids drift between webpage and PDF and makes owner edits local to one data module.
- **Alternatives considered**: Hand-maintained PDF or duplicated résumé content risks inconsistency.

### Design and motion

- **Decision**: Use a typography-led, warm-paper/ink palette with a rust-orange signal color and a restrained network trace motif. Use three small React Bits components for a subtle text reveal, project hover spotlight, and pointer magnetic treatment; preserve static content, avoid layout shift, and disable/short-circuit motion for reduced-motion users.
- **Rationale**: The palette and motif connect the network/observability story to a calm professional presentation. Three moments keep the page distinctive without delaying its first impression.
- **Alternatives considered**: Continuous 3D/particle backgrounds and full-screen entrance animation add weight and distract from the contact goal.
- **References**: [React Bits](https://github.com/DavidHDev/react-bits), [Taste Skill](https://github.com/Leonxlnx/taste-skill), [Impeccable](https://github.com/pbakaus/impeccable).

### SEO origin

- **Decision**: Read `NEXT_PUBLIC_SITE_URL` at build time for canonical and sitemap URLs. Until Sonu supplies the domain, use an explicit example origin and mark it as a launch TODO.
- **Rationale**: Static files cannot infer their eventual hostname; metadata must be rebuilt for the selected domain.
- **References**: [Next.js Metadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), [Next.js Sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap), [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Google structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

## Clarification Outcome

The initial answer batch confirms all-opportunity positioning, preferred name/photo handling, domain availability later, restrained visual direction, and professional-only content. Remaining questions are not blockers: missing personal details remain clearly marked TODOs; conflicting experience dates are retained verbatim pending owner confirmation. No further clarification question is required before planning.
