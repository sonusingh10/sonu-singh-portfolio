# Final verification checklist

Verification run: 11 October 2026 against the generated static site using the local preview server with gzip compression and immutable caching for hashed build assets.

## Build, SEO, and runtime

- [x] `npm run build` completes with no errors; the résumé and social preview are generated from `content/profile.ts`.
- [x] Production export contains `resume.pdf`, `social-card.png`, the 7LayerX screenshot, `sitemap.xml`, `robots.txt`, and the favicon.
- [x] Canonical, Open Graph, Twitter, sitemap, robots, and Person JSON-LD are present in the exported page. Set the canonical origin before deployment.
- [x] Lighthouse 12.8.2 desktop: Performance 100, Accessibility 100, Best Practices 100, SEO 100.
- [x] Lighthouse 12.8.2 mobile: Performance 98, Accessibility 100, Best Practices 100, SEO 100.
- [x] `npm audit`: zero vulnerabilities.

## Browser checks

- [x] Desktop at 1440px and mobile at 390px: no horizontal overflow, missing in-page anchors, failed local assets, or browser errors.
- [x] Theme toggle switches light/dark and remembers the selection. Keyboard focus is visible and the first Tab reaches “Skip to content”.
- [x] Reduced-motion preference keeps supporting copy visible without the BlurText animation; Magnet is disabled for reduced-motion and touch pointers.
- [x] Résumé, favicon, social card, screenshot, sitemap, and robots return HTTP 200 with the expected content types.
- [x] External link checks: 7LayerX and GitHub return HTTP 200. LinkedIn returned HTTP 999 to the automated check, so confirm the profile URL manually before launch.
- [x] Reviewed the page against Taste Skill and Impeccable guidance; the final pass tightened the mobile text sizes, contrast, first-screen availability copy, content hierarchy, and motion behavior.

## Owner TODOs before launch

- [ ] Replace `NEXT_PUBLIC_SITE_URL=https://your-domain.example` with the owned canonical domain, connect DNS, and rebuild/redeploy.
- [ ] Create a Formspree form, set `NEXT_PUBLIC_FORMSPREE_FORM_ID`, and submit a real end-to-end test. Until then, the site shows direct email/social contact instead of pretending the form is active.
- [ ] Confirm Helloclass (Jan 2016–Oct 2018) and Barracuda (Jul 2018–Jan 2020) dates; the supplied records overlap and are kept unchanged.
- [ ] Supply a professional photo and approved alt text if desired.
- [ ] Add further case studies or the 7LayerX technology stack only when those details are ready to share.
- [ ] Confirm the LinkedIn profile URL; the automated checker could not validate LinkedIn's response.
- [ ] Optional: configure a Plausible site and `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
