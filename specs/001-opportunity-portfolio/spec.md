# Feature Specification: Sonu Singh Opportunity Portfolio

**Feature Branch**: `001-opportunity-portfolio`

**Created**: 2026-10-11

**Status**: Approved for implementation

**Input**: User request for a personal portfolio website, source HTML at `~/Downloads/sonu_singh_portfolio(1).html`, live 7LayerX site, and the specified design/deployment requirements.

## User Scenarios & Testing

### User Story 1 - Assess fit quickly (Priority: P1)

A recruiter, client, or collaborator can identify Sonu's focus, experience, strongest skills, and availability in under 30 seconds, then reach a clear contact action.

**Why this priority**: The primary goal is to convert relevant visits into conversations.

**Independent Test**: Read the first screen and scan the page on mobile and desktop; confirm the role focus, availability, résumé action, and contact action are immediately understandable.

**Acceptance Scenarios**:

1. **Given** a first-time visitor opens the home page, **When** the hero loads, **Then** it identifies Sonu Singh, his technical account management focus across networking, security, and observability, his stated openness to jobs/freelance/collaborations, and contact and résumé actions.
2. **Given** a visitor wants to verify experience, **When** they scan the timeline, **Then** all four employers, roles, dates, and source-supported bullets are present without unsupported claims.

### User Story 2 - Explore a flagship project (Priority: P2)

A visitor can understand what 7LayerX is, how it is organized, and where to explore it.

**Why this priority**: It demonstrates initiative and connects Sonu's technical experience to a tangible project.

**Independent Test**: Confirm the project feature has a screenshot, link, problem/approach/outcome narrative, and no fabricated results or stack details.

**Acceptance Scenarios**:

1. **Given** a visitor reaches Projects, **When** they read the 7LayerX feature, **Then** it describes a practical layered engineering knowledge platform and links to the live site.
2. **Given** a visitor views the project image, **When** it loads or fails, **Then** its alt text conveys the same useful context and the live project link remains available.

### User Story 3 - Make contact (Priority: P1)

A prospective employer, client, or collaborator can contact Sonu through a configured form or direct channels.

**Why this priority**: A direct, low-friction next step is essential to the portfolio goal.

**Independent Test**: Verify required form fields and accessible errors/success states, direct LinkedIn and GitHub links, and mailto once its address is supplied.

**Acceptance Scenarios**:

1. **Given** a valid Formspree form ID is configured, **When** a visitor submits a valid message, **Then** the form posts to Formspree and reports its response accessibly.
2. **Given** no form ID or email address has been supplied, **When** a visitor reaches Contact, **Then** LinkedIn and GitHub remain usable and the unconfigured form/email are not presented as working channels.

### User Story 4 - Review and download résumé (Priority: P2)

A visitor can download a résumé generated from the same profile data as the page.

**Why this priority**: Recruiters can keep a portable summary without introducing content drift.

**Independent Test**: Generate the PDF from the typed profile, open it, and compare its employment/skills/credentials with the rendered page.

**Acceptance Scenarios**:

1. **Given** the site is built, **When** a visitor selects Download résumé, **Then** a readable PDF is served from `/public`.
2. **Given** profile details change, **When** the documented generation command runs, **Then** the PDF reflects those details from the same typed data source.

### User Story 5 - Find the portfolio through search and deploy it (Priority: P3)

Search engines receive accurate identity and page metadata, and the owner can deploy the same static output to Vercel or Cloudflare Pages.

**Why this priority**: Search visibility and low-friction deployment support long-term opportunity discovery.

**Independent Test**: Inspect generated metadata, social image, sitemap, robots file, and Person JSON-LD; build and serve the static export on each documented platform path.

**Acceptance Scenarios**:

1. **Given** a crawler visits the site, **When** it reads the generated assets, **Then** it finds canonical metadata (once the domain is configured), social metadata, sitemap, robots instructions, and valid Person JSON-LD.
2. **Given** the project is exported, **When** its output is deployed to either documented host, **Then** navigation and contact alternatives remain available without a server runtime.

### Edge Cases

- Missing domain: canonical and sitemap origin use an explicit environment/configuration placeholder and are documented as a launch TODO.
- Missing Formspree ID or email: do not show a falsely operational form or mailto link; leave direct social contact available.
- Missing portrait: use an intentional initials/typography treatment with no invented likeness; keep photo replacement documented.
- Missing education and unsupported additional projects/stack: omit them from claims and mark them as owner TODOs.
- Conflicting supplied employment periods: retain stated dates and surface a TODO for Sonu to resolve; do not silently alter them.
- Reduced motion: all core content and actions remain available with animations disabled.
- External 7LayerX image unavailable: provide useful alternative text and keep the project link.
- Analytics absent: no external analytics request is made by default.

## Requirements

### Functional Requirements

- **FR-001**: The site MUST use Next.js App Router, TypeScript, and Tailwind CSS and produce a static export deployable to Vercel and Cloudflare Pages.
- **FR-002**: The hero MUST present Sonu's name, source-supported value proposition, availability, contact CTA, and downloadable résumé CTA.
- **FR-003**: About, Experience, Projects, Skills, Contact, and Footer MUST follow the source material and opportunity-first content hierarchy.
- **FR-004**: Experience MUST include Cisco Systems, StarLink, Barracuda Networks, and Helloclass, with the source role and date strings and 2–4 factual outcome/responsibility bullets each.
- **FR-005**: 7LayerX MUST be the featured project with a screenshot, live link, problem/approach/outcome copy supported by the source or live site, and a TODO for unavailable stack/results.
- **FR-006**: Skills MUST be grouped by observability, networking, security, and cloud/systems; credentials MUST be represented exactly as supplied.
- **FR-007**: All editable profile facts MUST be held in one typed data module consumed by the site and résumé generator.
- **FR-008**: Contact MUST include an accessible form integration configurable through a non-secret Formspree form ID, direct LinkedIn and GitHub links, and mailto only when an email is supplied. No secret may be committed.
- **FR-009**: The site MUST support dark and light themes and respect `prefers-reduced-motion`.
- **FR-010**: Search support MUST include title/description metadata, canonical URL, Open Graph and Twitter metadata/images, sitemap, robots instructions, and Person JSON-LD.
- **FR-011**: Privacy-friendly analytics MAY be configured, but MUST be disabled by default and optional at build/deploy time.
- **FR-012**: Navigation, forms, themes, and motion MUST be usable with a keyboard and screen reader; images MUST have meaningful alternative text.
- **FR-013**: README MUST explain setup, content editing, and résumé PDF generation. DEPLOYMENT MUST give explicit Vercel and Cloudflare Pages steps, build/output configuration, environment variables, and custom-domain setup.
- **FR-014**: The repository MUST include Spec Kit constitution, specification, plan, and task artifacts.
- **FR-015**: A final checklist MUST report actual build, Lighthouse, links, and mobile-review outcomes and list unresolved owner TODOs.

### Key Entities

- **Profile**: Name, role/value proposition, availability, location, about copy, social/contact links, grouped skills, credentials, experience, projects, SEO configuration, and résumé content.
- **Experience**: Employer, location, date range, role, description, and source-supported impact/responsibility bullets.
- **Project**: Name, URL, image/alt text, problem, approach, result, role, and known stack; unknown values remain TODOs.
- **Contact submission**: Visitor name, email, message, and configured form provider response; the portfolio does not persist submissions itself.

## Success Criteria

### Measurable Outcomes

- **SC-001**: At least 4 of 5 unbriefed reviewers can identify Sonu's focus and a contact path after a 30-second scan.
- **SC-002**: On a production-quality run, Lighthouse Performance, Accessibility, Best Practices, and SEO each score at least 95; any unmet score is reported with its measurement conditions.
- **SC-003**: All source-listed roles, dates, grouped skills, credentials, and the 7LayerX project link appear in the site or résumé, with no unsupported factual claims.
- **SC-004**: At mobile and desktop breakpoints, page content remains readable, navigable by keyboard, and free of horizontal overflow.
- **SC-005**: Every internal route/resource link resolves in a production build, and every external target is checked at delivery time.
- **SC-006**: `npm run build` completes successfully and produces a static deployment directory.

## Assumptions

- The provided HTML is the authoritative source for personal facts; the live 7LayerX website may substantiate project content only.
- The requested audience is recruiters, prospective clients, and collaborators.
- The portfolio will use a restrained palette chosen during design.
- A final domain, photo, email address, education details, additional portfolio projects, Formspree form ID, and actual 7LayerX stack may be supplied later.
- The overlap between Helloclass (Jan 2016–Oct 2018) and Barracuda Networks (Jul 2018–Jan 2020) is preserved and flagged for confirmation.
- No response-time promise or quantified 7LayerX result will be claimed without evidence.

## Clarifications

### Session 2026-10-11

- Q: Which opportunities should the site prioritize? → A: Jobs, freelance, and collaborations.
- Q: What name and photo preference should I use? → A: Sonu Singh; a photo will be supplied later.
- Q: What domain should I use for canonical SEO URLs and deployment guidance? → A: A domain is owned and will be shared later.
- Q: Do you have preferred accent colors or a visual style? → A: Choose a restrained palette.
- Q: Is there anything you want omitted from the source material or public site? → A: Use professional details only.
