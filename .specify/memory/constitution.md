<!--
Sync Impact Report
- Version change: template -> 1.0.0 (initial constitution)
- Modified principles: none (template placeholders replaced with project rules)
- Added sections: Product and Content Integrity; Quality and Delivery
- Removed sections: none
- Deferred items: final domain, email address, education details, additional projects,
  portrait photo, and resolution of the source experience-date overlap remain TODOs.
-->
# Sonu Singh Portfolio Constitution

## Core Principles

### I. Evidence-led personal claims
All biography, experience, education, skills, projects, dates, outcomes, and contact details MUST come from the supplied portfolio source or another source explicitly approved by Sonu. Missing or conflicting facts MUST be marked as TODO or clarified; metrics, employers, credentials, and dates MUST NOT be invented.

### II. Opportunity-first communication
The first screen MUST make Sonu's professional focus, value, availability, and next contact action clear. Every section MUST help a recruiter, prospective client, or collaborator understand fit and take a next step.

### III. One typed content source
Portfolio facts MUST live in one typed content module and be consumed by the page, metadata, structured data, and résumé generation. Components MUST NOT duplicate or quietly alter career facts.

### IV. Accessible, responsive, restrained interaction
The site MUST work with keyboard and assistive technology, meet WCAG AA contrast intent, adapt from small screens upward, and honor reduced-motion preferences. Animation MUST clarify hierarchy or feedback, not delay content or obstruct navigation.

### V. Portable, private, and maintainable delivery
The project MUST use Next.js App Router, TypeScript, and Tailwind CSS; deploy as static assets to Vercel and Cloudflare Pages; keep secrets out of source control; and document any external service configuration. Static pages MUST remain useful when optional analytics or contact-form configuration is absent.

## Product and Content Integrity

The single-page portfolio is intended to turn professional interest into contact. It MUST present only the supplied work history and verified 7LayerX material. It MUST avoid fabricated endorsements, customer names, results, project metrics, education, or response-time promises. Contact alternatives MUST remain visible if the form provider is not configured. The domain is configurable until Sonu supplies it.

## Quality and Delivery

The project MUST include metadata, Open Graph and Twitter cards, sitemap, robots instructions, and Person JSON-LD. The résumé PDF MUST be generated from the typed profile data. A deployment guide MUST explain Vercel and Cloudflare Pages setup, including environment variables and domain configuration. Before delivery, run the requested production build, link review, mobile review, accessibility/performance checks where the environment permits, and a design critique/polish pass. Report actual results and any unavailable measurements; never claim an unrun check passed.

## Governance

This constitution governs the portfolio and overrides conflicting implementation defaults. Amend it when product goals or evidence rules change, and update its version and Sync Impact Report. Use semantic versioning: MAJOR for removed or redefined principles, MINOR for added principles or materially expanded requirements, and PATCH for clarifications. Each implementation review MUST check content provenance, accessible behavior, responsive layout, privacy, and deployability. Open TODOs MUST be included in the handoff.

**Version**: 1.0.0 | **Ratified**: 2026-10-11 | **Last Amended**: 2026-10-11
