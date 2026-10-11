# Deployment

The app is a Next.js static export. Each provider serves the same generated `out/` directory. Set the production site URL before building so canonical, Open Graph, sitemap, robots, and Person URLs use the owned domain.

## Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the framework preset as **Next.js**.
3. Use `npm install` for install and `npm run build` for build. The Next config enables static export; Vercel detects the generated static output automatically.
4. Add these project environment variables for **Production** (and Preview if preview URLs should carry production profile metadata):
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.example` (replace with your owned domain)
   - `NEXT_PUBLIC_FORMSPREE_FORM_ID` = the Formspree form ID; leave unset until the form is created
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = optional; add only if a Plausible site has been configured
5. Deploy. After changing environment values, trigger a new deployment because these values are embedded at build time.
6. In **Settings → Domains**, add the owned domain and follow the DNS records Vercel displays. Verify the domain, set the preferred apex or `www` host, and redirect the other host to it.
7. Update `NEXT_PUBLIC_SITE_URL` to the preferred canonical host, then redeploy.

## Cloudflare Pages

1. Push this repository to GitHub and choose **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the repository and use:
   - Framework preset: **Next.js (Static HTML Export)** (or **None** if that preset is not offered)
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/`
3. Add these build environment variables in **Settings → Environment variables**:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.example`
   - `NEXT_PUBLIC_FORMSPREE_FORM_ID` = Formspree form ID, when configured
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = optional Plausible domain, when configured
4. Save and deploy. The Next.js config has `output: "export"`; no OpenNext adapter or Worker runtime is needed for this static site. Do not enable server-only Next features without changing the deployment architecture.
5. In the Pages project, open **Custom domains**, add your domain, and follow the displayed DNS instructions. For a zone already on Cloudflare, Pages can create the DNS record. For an external DNS provider, add the CNAME record Cloudflare specifies. Add the preferred hostname and redirect the alternate hostname.
6. Set `NEXT_PUBLIC_SITE_URL` to the final preferred hostname and redeploy so canonical/SEO URLs match.

## Contact and analytics

The message form is enabled only when `NEXT_PUBLIC_FORMSPREE_FORM_ID` is set. It uses native browser validation and posts directly to Formspree; Formspree handles the confirmation/error response. Create the form in Formspree, set its public form ID as the environment variable, then deploy again. The email and social contact links work independently. Plausible is optional and is not loaded until `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is configured.
