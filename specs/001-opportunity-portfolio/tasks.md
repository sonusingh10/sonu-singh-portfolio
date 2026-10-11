# Tasks: Sonu Singh Opportunity Portfolio

**Input**: [Specification](spec.md), [implementation plan](plan.md), and research/design references.  
**Goal**: Deliver a deployable portfolio that converts relevant visits to qualified contact.

## Phase 1: Setup

- [x] T001 Initialize Next.js App Router, TypeScript, Tailwind, static export, build scripts, and environment example at repository root.
- [x] T002 [P] Add app favicon, branded Open Graph/Twitter preview assets, screenshot assets folder, and `.gitignore`.
- [x] T003 Add `content/profile.ts` with source-supported professional facts and typed project/experience groups; record owner TODOs in the final checklist.

## Phase 2: Foundational

- [x] T004 Configure static export, `metadataBase`, canonical metadata, sitemap, robots, and Person JSON-LD from typed profile data.
- [x] T005 Create semantic page shell, font/type/spacing/color tokens, keyboard skip link, focus styles, light/dark theme base, and reduced-motion rules.
- [x] T006 Generate a screenshot image of the live 7LayerX site and save optimized alt-described asset under `public/images/`.
- [x] T007 [P] Add React Bits Blur Text, Spotlight Card, and Magnet components and document upstream license/attribution.
- [x] T008 Create résumé PDF generator consuming `content/profile.ts`; emit `public/resume.pdf`.

## Phase 3: User Story 1 - Assess fit quickly (Priority: P1)

**Goal**: Make focus, proof, and availability clear within a short scan.

**Independent test**: Check first-screen hierarchy and scroll the rendered page for exact source claims; verify responsive layout and copy.

- [x] T009 [US1] Build site header/navigation with contact link and résumé link.
- [x] T010 [US1] Build hero with name, focus, availability, and two prominent CTAs.
- [x] T011 [US1] Build About section using professional-only source copy.
- [x] T012 [US1] Build Experience timeline from all four source roles with 2–4 factual bullets each and source date strings.
- [x] T013 [US1] Build grouped skills and exact certifications from profile data.
- [x] T014 [US1] Add tasteful motion to specified components with reduced-motion and static fallbacks.

## Phase 4: User Story 2 - Explore flagship project (Priority: P2)

**Goal**: Tell a verifiable problem/approach/outcome story about 7LayerX.

**Independent test**: Inspect the project feature for image/alt, link, source-backed story, and absent/incomplete details shown as TODOs in the final handoff.

- [x] T015 [US2] Build 7LayerX feature with saved screenshot, live project link, problem, approach, qualitative outcome, and role; leave unknown stack/metrics out of claims.

## Phase 5: User Story 3 - Make contact (Priority: P1)

**Goal**: Give every audience an obvious, accessible contact path.

**Independent test**: Verify form is conditional on Formspree ID, native field validation is enabled, Formspree handles submission responses, and source social links work.

- [x] T016 [US3] Build native Formspree contact form with required fields and honeypot; let the provider handle submission confirmation/error.
- [x] T017 [US3] Add LinkedIn, GitHub, mailto, no invented response expectation, and footer contact links.
- [x] T018 [US3] Add optional analytics integration disabled by default, or document that no analytics is configured until requested.

## Phase 6: User Story 4 - Review and download résumé (Priority: P2)

**Goal**: Provide a readable PDF derived from the same typed data.

**Independent test**: Build and inspect `public/resume.pdf` and compare its facts to `content/profile.ts`.

- [x] T019 [US4] Tune résumé layout, filename, nav/hero download links, and README regeneration instructions.

## Phase 7: User Story 5 - Find and deploy (Priority: P3)

**Goal**: Make the portfolio searchable and straightforward to deploy.

**Independent test**: Inspect exported HTML for metadata/schema, confirm sitemap/robots output, and follow each deployment guide to its final settings.

- [x] T020 [US5] Finish OG/Twitter metadata, sitemap, robots, and Person schema; validate output and avoid empty personal-data properties.
- [x] T021 [US5] Write README, `.env.example`, and complete Vercel and Cloudflare Pages `DEPLOYMENT.md` instructions.
- [x] T022 [US5] Check links and expected files in production build; add final verification checklist with observed Lighthouse/mobile/link results and outstanding owner TODOs.

## Phase 8: Polish and Cross-Cutting

- [x] T023 Audit both color themes, focus order, keyboard operation, contrast, alt text, and reduced motion.
- [x] T024 Review desktop and mobile screenshots; check no overflow, layout shift, console errors, or missing assets.
- [x] T025 Run Taste Skill critique and Impeccable critique/polish guidance; record findings and corrective changes in the final checklist.
- [x] T026 Refresh project notes for referenced GitHub repositories according to workspace `AGENTS.md` (star date, declared license, purpose, topic-note consistency).
- [x] T027 Run `npm run build`, confirm the static output and résumé are present, then commit the complete deliverable.

## Dependencies

- Setup → Foundational → US1.
- US2 and US3 depend on the profile model/assets; US4 depends on profile model; US5 depends on site shell.
- Final polish depends on the relevant stories and docs being complete.

## Implementation Strategy

Implement the smallest useful portfolio first, then layer in the flagship case story,
contact behavior, résumé, SEO/deployment docs, and final review. Keep claims sourced at
each step. Owner-supplied items remain explicit launch TODOs and do not block the public
professional profile or direct social links.
