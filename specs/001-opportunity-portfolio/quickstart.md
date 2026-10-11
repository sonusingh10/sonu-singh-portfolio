# Quickstart

## Requirements

- Node.js 22 LTS and npm.
- No server/database account is required to build or preview the static site.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The home page and social links work without optional
services. Add the final site URL and Formspree form ID to `.env.local` when available.

## Build and résumé

```bash
npm run resume:build
npm run build
```

The résumé generator reads `content/profile.ts` and writes `public/resume.pdf`.
Next.js writes the static site to `out/`.

## Configure contact

Create a form in Formspree, set `NEXT_PUBLIC_FORMSPREE_FORM_ID` to its form ID, and
rebuild. Add the owner's public email to the profile only after it is supplied.

See [DEPLOYMENT.md](../../DEPLOYMENT.md) for hosting instructions.
