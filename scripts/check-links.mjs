/**
 * Internal link checker. Run after `npm run build`.
 *
 * Scans every HTML file in dist/ and checks that each internal link (href/src
 * starting with the base path) points at a file that actually exists. This
 * catches the most common breakage on sub-path deployments: a link written as
 * "/projects/" instead of href('/projects/').
 *
 * External links are not checked (that would make builds slow and flaky).
 *
 * Usage: npm run test:links    (exits 1 if anything is broken)
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const DIST = 'dist';
const BASE = (process.env.BASE_PATH ?? '/personal-portfolio').replace(/\/+$/, '');

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `npm run build` first.');
  process.exit(1);
}

/** All .html files under a directory. */
const htmlFiles = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return path.endsWith('.html') ? [path] : [];
  });

/** Map a URL path like /personal-portfolio/projects/ to a file in dist/. */
function resolves(urlPath) {
  const clean = decodeURIComponent(urlPath.split(/[?#]/)[0]);
  if (!clean.startsWith(`${BASE}/`) && clean !== BASE) return false;
  const local = join(DIST, clean.slice(BASE.length));
  return existsSync(join(local, 'index.html')) || (existsSync(local) && statSync(local).isFile());
}

const ATTR = /\s(?:href|src)="([^"]+)"/g;
const broken = [];
let checked = 0;

for (const file of htmlFiles(DIST)) {
  const html = readFileSync(file, 'utf8');
  for (const [, url] of html.matchAll(ATTR)) {
    // Skip external, mail, in-page anchors and data URIs.
    if (/^([a-z]+:|#|\/\/)/i.test(url)) continue;
    checked++;
    if (!url.startsWith('/')) {
      broken.push({ file, url, why: 'relative URL (use href() helper)' });
    } else if (!resolves(url)) {
      broken.push({ file, url, why: url.startsWith(BASE) ? 'not found' : 'missing base path' });
    }
  }
}

if (broken.length) {
  console.error(`✗ ${broken.length} broken internal link(s):\n`);
  for (const b of broken) console.error(`  ${relative(DIST, b.file)}  →  ${b.url}  (${b.why})`);
  process.exit(1);
}
console.log(`✓ ${checked} internal links OK`);
