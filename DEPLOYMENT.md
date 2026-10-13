# Deployment

The app is a Next.js static export. Each provider serves the same generated `out/` directory. Set the production site URL before building so canonical, Open Graph, sitemap, robots, and Person URLs use the owned domain.

## Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project**, import the repository, and keep the framework preset as **Next.js**.
3. Use `npm install` for install and `npm run build` for build. The Next config enables static export; Vercel detects the generated static output automatically.
4. Add these project environment variables for **Production** (and Preview if preview URLs should carry production profile metadata):
   - `NEXT_PUBLIC_SITE_URL` = `https://sonusinghx.com`
   - `NEXT_PUBLIC_FORMSPREE_FORM_ID` = the Formspree form ID; leave unset until the form is created
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = optional; add only if a Plausible site has been configured
5. Deploy. After changing environment values, trigger a new deployment because these values are embedded at build time.
6. In **Settings → Domains**, add `sonusinghx.com` and follow the DNS records Vercel displays. Verify the domain, set the preferred apex or `www` host, and redirect the other host to it.
7. Update `NEXT_PUBLIC_SITE_URL` to the preferred canonical host, then redeploy.

## Cloudflare Pages

1. Push this repository to GitHub and choose **Workers & Pages → Create → Pages → Connect to Git**.
2. Select the repository and use:
   - Framework preset: **Next.js (Static HTML Export)** (or **None** if that preset is not offered)
   - Build command: `npm run build`
   - Build output directory: `out`
   - Root directory: `/`
3. Add these build environment variables in **Settings → Environment variables**:
   - `NEXT_PUBLIC_SITE_URL` = `https://sonusinghx.com`
   - `NEXT_PUBLIC_FORMSPREE_FORM_ID` = Formspree form ID, when configured
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` = optional Plausible domain, when configured
   - `NEXT_PUBLIC_ANALYTICS_ENABLED` = `true` after Cloudflare Functions and the D1 binding below are ready
   - `NEXT_PUBLIC_SHOW_PUBLIC_COUNTERS` = `false` to keep counts private
4. Save and deploy. The site remains a static export; the small `/functions` handlers below provide only the counters API.
5. In the Pages project, open **Custom domains**, add `sonusinghx.com`, and follow the displayed DNS instructions. Because this is an apex domain, add `sonusinghx.com` as a Cloudflare zone and point the domain's nameservers at Cloudflare at your registrar. Once the zone is active, Pages can create the DNS record. Add `www.sonusinghx.com` too if you want both hostnames, then choose one canonical hostname and redirect the other.
6. Set `NEXT_PUBLIC_SITE_URL` to the final preferred hostname and redeploy so canonical/SEO URLs match.

## Contact and analytics

The message form is enabled only when `NEXT_PUBLIC_FORMSPREE_FORM_ID` is set. It uses native browser validation and posts directly to Formspree; Formspree handles the confirmation/error response. Create the form in Formspree, set its public form ID as the environment variable, then deploy again. The email and social contact links work independently. Plausible is optional and is not loaded until `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is configured.

### Private page and résumé counts (Cloudflare Pages)

The first-party counter records aggregate page loads and résumé download clicks. It does not save IP addresses, cookies, referrers, or visitor identities. Repeat visits and repeat downloads count again, so the numbers are event totals rather than unique people. The public badge is disabled by default; owner counts are available at `https://sonusinghx.com/insights` after configuration. This optional counter uses Cloudflare Pages Functions and D1; it remains off on Vercel unless you add a separate compatible backend.

1. In Cloudflare, open **Workers & Pages → D1 SQL Database → Create database** and create a database named `sonu-portfolio-analytics`.
2. Open that database's **Console** and execute the contents of `migrations/0001_analytics.sql` once.
3. Open the Pages project for this site and go to **Settings → Bindings → Add → D1 database**. Set the variable name to `ANALYTICS_DB`, select `sonu-portfolio-analytics`, save, and redeploy.
4. Under **Settings → Variables and Secrets** for the Pages Functions runtime, add secret `ANALYTICS_ADMIN_TOKEN`. Generate a long random value on your computer (for example, `openssl rand -hex 32`) and paste it directly into Cloudflare. Do not add it to `.env`, Git, or a public build variable.
5. Add the runtime variable `SHOW_PUBLIC_COUNTERS` with value `false`. This keeps `/api/stats` private and the footer counters hidden.
6. In the Pages **Build → Environment variables**, set `NEXT_PUBLIC_ANALYTICS_ENABLED=true` and `NEXT_PUBLIC_SHOW_PUBLIC_COUNTERS=false`, then trigger a new deployment. These `NEXT_PUBLIC_` values are compiled into the static site.
7. Visit `/insights` and enter the `ANALYTICS_ADMIN_TOKEN` you saved in Cloudflare. After deployment, page loads and clicks on either résumé download link begin incrementing the totals.

To show aggregate counts publicly later, set `SHOW_PUBLIC_COUNTERS=true` in the Functions runtime and `NEXT_PUBLIC_SHOW_PUBLIC_COUNTERS=true` in the build environment, then redeploy. That makes the aggregate totals readable by anyone; it still does not expose visitor identities because none are collected.
