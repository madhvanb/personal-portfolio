/**
 * Site-wide settings: who you are, how to reach you, what's in the nav.
 *
 * This is the ONE place for identity details. Components read from here, so
 * changing your name, email or a social link here updates the whole site.
 *
 * Long-form content (projects, writing, experience...) lives in src/content/.
 * See docs/content.md.
 */

export interface SocialLink {
  /** Shown in the UI, e.g. "GitHub". */
  label: string;
  url: string;
}

export interface NavItem {
  label: string;
  /** Path WITHOUT the base path, e.g. "/projects/". `href()` adds the base. */
  path: string;
}

export const site = {
  /** Full name. Used in the header, <title>, footer and résumé. */
  name: 'Madhvan',
  /** One-line role. Keep it plain. */
  role: 'Machine Learning Engineer',
  /**
   * Positioning statement for the home page hero. One or two sentences on
   * what you do and for whom. Write it the way you'd say it out loud.
   * TODO: replace with your own.
   */
  intro:
    'I build machine learning systems that leave the notebook: models trained, evaluated honestly, and shipped behind real products.',
  /** Short description used for SEO and link previews. */
  description: 'Machine learning engineer. Projects, writing and résumé.',
  location: 'Earth', // TODO
  /** Shown on the home page. Set to '' to hide. */
  status: 'Open to ML / AI engineering roles',
  /** Areas you work in. Shown in the hero facts table. */
  focus: ['Deep learning', 'LLMs', 'MLOps'],
  /** TODO: your real address. Shown publicly on the site. */
  email: 'you@example.com',
  socials: [
    { label: 'GitHub', url: 'https://github.com/madhvanb' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/' }, // TODO
    { label: 'Hugging Face', url: 'https://huggingface.co/' }, // TODO
    { label: 'Google Scholar', url: 'https://scholar.google.com/' }, // TODO
  ] satisfies SocialLink[],
  nav: [
    { label: 'Work', path: '/projects/' },
    { label: 'Writing', path: '/writing/' },
    { label: 'Résumé', path: '/resume/' },
  ] satisfies NavItem[],
  /** Link to this site's source code, shown in the footer. Set to '' to hide. */
  sourceUrl: 'https://github.com/madhvanb/personal-portfolio',
} as const;
