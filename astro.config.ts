/**
 * Astro configuration.
 *
 * Deployment target
 * -----------------
 * By default the site is built for GitHub Pages as a *project* site:
 *   https://madhvanb.github.io/personal-portfolio/
 * which means every URL lives under the `/personal-portfolio` base path.
 *
 * To deploy somewhere else (custom domain, Netlify, Vercel, or a repo named
 * `<user>.github.io`), set these environment variables at build time instead
 * of editing this file:
 *   SITE_URL=https://example.com  BASE_PATH=/  npm run build
 *
 * Never hard-code the base path in links. Use `href()` from `src/lib/url.ts`.
 * See docs/deployment.md.
 */
import { satteri } from '@astrojs/markdown-satteri';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import { katexPlugin } from './src/lib/markdown/katex';
import { monoDark, monoLight } from './src/lib/markdown/shiki-mono';

const site = process.env.SITE_URL ?? 'https://madhvanb.github.io';
const base = process.env.BASE_PATH ?? '/personal-portfolio';

export default defineConfig({
  site,
  base,
  // `/projects/foo/` style URLs. Matches how GitHub Pages serves folders.
  trailingSlash: 'always',
  integrations: [mdx(), sitemap()],
  markdown: {
    // Sätteri is Astro's built-in Markdown engine. `math` enables $inline$ and
    // $$block$$ LaTeX; katexPlugin renders it to HTML at build time.
    processor: satteri({ features: { math: true }, mdastPlugins: [katexPlugin] }),
    // Black-and-white code highlighting (see src/lib/markdown/shiki-mono.ts).
    // Both themes are emitted as CSS variables; prose.css picks one.
    shikiConfig: {
      themes: { light: monoLight, dark: monoDark },
      defaultColor: false,
      wrap: false,
    },
  },
});
