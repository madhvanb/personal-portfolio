/**
 * /robots.txt: lets search engines crawl everything and points them at the sitemap.
 */
import type { APIContext } from 'astro';
import { href } from '@/lib/url';

export function GET({ site }: APIContext) {
  const sitemap = new URL(href('/sitemap-index.xml'), site);
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
