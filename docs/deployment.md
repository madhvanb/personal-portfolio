# Deployment

## GitHub Pages (default)

The site deploys to **https://madhvanb.github.io/personal-portfolio/**.

One-time setup:

1. On GitHub: **Settings → Pages → Build and deployment → Source:** choose
   **GitHub Actions**.
2. Push to `main`.

After that, every push to `main` runs `.github/workflows/ci.yml`: it verifies
and builds the site, then publishes `dist/`. Watch it under the **Actions**
tab. Pushes to other branches and pull requests are verified but not deployed.

## Base path

A GitHub _project_ site lives under `/<repo-name>/`, so every internal URL
needs that prefix. This is configured once in `astro.config.ts`:

```ts
const site = process.env.SITE_URL ?? 'https://madhvanb.github.io';
const base = process.env.BASE_PATH ?? '/personal-portfolio';
```

Code adds it to links via `href()` (`src/lib/url.ts`), and
`npm run test:links` fails the build if any link is missing it.

## Custom domain (e.g. madhvan.dev)

1. Buy the domain. Add DNS records as described in
   [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).
2. In **Settings → Pages**, enter the domain and tick **Enforce HTTPS**.
3. Add `public/CNAME` containing just the domain (`madhvan.dev`).
4. The site now lives at the root, so change the defaults in
   `astro.config.ts`:
   ```ts
   const site = process.env.SITE_URL ?? 'https://madhvan.dev';
   const base = process.env.BASE_PATH ?? '/';
   ```
   and the `BASE` default in `scripts/check-links.mjs` to `''`.

The same change applies if you rename the repo to `madhvanb.github.io`.

## Other hosts (Netlify, Vercel, Cloudflare Pages)

Import the repo and set:

- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: `SITE_URL=https://your-domain` and `BASE_PATH=/`

## Checking a production build locally

```sh
npm run build
npm run preview
```
