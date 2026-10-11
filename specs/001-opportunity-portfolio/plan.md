# Implementation Plan: Sonu Singh Opportunity Portfolio

**Branch**: `001-opportunity-portfolio` | **Date**: 2026-10-11 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `/specs/001-opportunity-portfolio/spec.md`

## Summary

Build a fast, responsive portfolio that helps recruiters, clients, and collaborators
understand Sonu's observability, networking, and security experience and contact him.
Use a static Next.js export so the same build deploys to Vercel and Cloudflare Pages.
Keep verified facts in a typed profile, generate the résumé from that module, and use
Formspree when an owner-configured endpoint is available.

## Technical Context

**Language/Version**: TypeScript 5; Node.js 22 LTS target  
**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, selected React Bits components  
**Storage**: Static files only; contact submissions are delivered to Formspree  
**Testing**: `npm run build`; manual link, mobile, keyboard, reduced-motion, SEO and Lighthouse verification requested by the user  
**Target Platform**: Vercel and Cloudflare Pages static hosting  
**Project Type**: Single web application / static export  
**Performance Goals**: Lighthouse 95+ in Performance, Accessibility, Best Practices, and SEO  
**Constraints**: First-screen content remains static and visible; no secrets in browser bundle; no invented biography; privacy analytics opt-in; no Next server-only features  
**Scale/Scope**: One long-form home page, one typed profile, one PDF résumé, three purposeful motion components

## Constitution Check

- Evidence-led claims: pass; unsupported details remain TODOs.
- Opportunity-first first screen and direct contact: pass; form is conditional on endpoint configuration.
- One typed content source: pass; page, metadata/schema, and résumé import `content/profile.ts`.
- Accessible, responsive, restrained interaction: pass by design; verify keyboard, themes, reduced motion, and breakpoints.
- Static and private deployment: pass; Formspree is an external static-compatible form service, analytics opt-in.
- Requested docs/spec artifacts and delivery checks: included in tasks.

## Project Structure

```text
app/
  layout.tsx                 # metadata, fonts, privacy analytics hook
  page.tsx                   # server-rendered portfolio page
  styles.css                 # palette, typography, responsive and reduced-motion rules
  sitemap.ts                 # canonical static sitemap
  robots.ts                  # public crawl rules and sitemap pointer
components/
  site-header.tsx             # semantic nav and static theme control
  contact-form.tsx            # static Formspree form, only rendered when configured
  react-bits/                 # BlurText, SpotlightCard, Magnet and source license
content/
  profile.ts                 # only editable source of profile and résumé facts
scripts/
  generate-resume.ts          # emits public/resume.pdf from content/profile.ts
  generate-social-image.ts    # emits public/social-card.png from profile data
  serve.mjs                   # gzip/cache-enabled local static preview
public/
  images/7layerx-screenshot.webp
  social-card.png
  resume.pdf
specs/001-opportunity-portfolio/
  spec.md, plan.md, tasks.md, research.md, data-model.md, quickstart.md, contracts/
```

**Structure Decision**: Keep a single Next.js app with server-rendered page sections.
Client components are limited to focused React Bits effects; all profile content,
native theme control, and optional Formspree form are rendered in initial HTML.

## Risks and Mitigations

- Final canonical origin is unknown: keep one env setting and a clearly named TODO.
- Formspree destination is not configured: omit the form until the public form ID exists and preserve direct contact links. When configured, use native validation/posting and Formspree's confirmation response.
- Source dates overlap: render source dates exactly and list a launch TODO.
- React Bits has MIT + Commons Clause terms: copy only named components and retain the upstream license/attribution file in the project; do not sell or redistribute the components as a component library.
- Static export has no Next runtime: keep all pages static and send form data to Formspree.
- Lack of photo and further projects: use professional-only text, no portrait claim, and explicit TODOs. Use the supplied résumé's professional email and education; omit the phone number from public site content.

## Design Direction

Use a warm ivory paper surface, deep pine/ink text, and rust-orange signal accents in
light mode, with a deep green-black dark mode. Large editorial type, measured spacing,
thin line rules, and a small network-route diagram create an intentional technical
identity without copying either inspiration site. The hero's name and value proposition
remain visible before any animation. Use Blur Text once on a supporting line, Spotlight
Card on the 7LayerX feature, and Magnet around one CTA. Keep all content in the rendered
page, make effects decorative only, and disable them for reduced motion and touch
where appropriate.

## Quality Gates

1. Constitution and source-data audit before content implementation.
2. Production static build and PDF generation.
3. Browser review at desktop and mobile widths, both themes, keyboard focus, and reduced motion.
4. Internal/external link review and SEO metadata/JSON-LD verification.
5. Lighthouse run in a documented production-like environment; record observed scores.
6. Design critique and polish pass based on Taste Skill and Impeccable guidance.

## Complexity Tracking

No constitution violations. External form delivery is the minimum viable approach that
keeps one static build deployable to both requested hosts.
