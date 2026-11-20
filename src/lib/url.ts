/**
 * URL helpers.
 *
 * The site can be served from a sub-path (e.g. /personal-portfolio/ on GitHub
 * Pages). Linking to "/projects/" directly would break there, so every
 * internal link goes through `href()`.
 */

const BASE = import.meta.env.BASE_URL; // e.g. "/personal-portfolio/" or "/"

/**
 * Turn a site path into a real URL path that includes the base.
 *
 * @example href('/projects/')   // "/personal-portfolio/projects/"
 * @example href('/')            // "/personal-portfolio/"
 */
export function href(path: string): string {
  const base = BASE.endsWith('/') ? BASE : `${BASE}/`;
  return base + path.replace(/^\/+/, '');
}

/** True when `path` is the current page or one of its children. Used for nav highlighting. */
export function isActive(currentPathname: string, path: string): boolean {
  const target = href(path);
  if (target === href('/')) return currentPathname === target;
  return currentPathname.startsWith(target);
}

/** Strip the protocol and trailing slash for display, e.g. "github.com/madhvanb". */
export function prettyUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}
