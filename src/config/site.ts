/**
 * Site-wide settings: who you are, how to reach you, what's in the nav.
 *
 * This is the ONE place for identity details. Components read from here, so
 * changing your name, email or a social link here updates the whole site.
 *
 * Long-form content (projects, writing) lives in src/content/; résumé lists
 * (experience, education, publications...) live in src/data/.
 * See docs/content.md.
 */

export interface SocialLink {
  /** Shown in the UI, e.g. "GitHub". */
  label: string;
  url: string;
}

export interface NavItem {
  label: string;
  /** Path WITHOUT the base path, e.g. "/work/". `href()` adds the base. */
  path: string;
  /** Hide this item while the named collection has no published entries. */
  hideIfEmpty?: 'writing';
}

export const site = {
  /** Full name. Used in the header, <title>, footer and résumé. */
  name: 'Madhvan Bajaj',
  /** Other spellings of your name in author lists, so they get bolded too. */
  authorAliases: ['M. Bajaj', 'Bajaj, M.', 'Bajaj M'],
  /** One-line role, under your name on the résumé and in page titles. */
  role: 'Machine Learning · Data Science & AI',
  /**
   * Home page intro: a greeting and two or three plain sentences.
   * Write it the way you'd introduce yourself to someone at a café.
   */
  greeting: "Hi, I'm Madhvan.",
  intro: [
    'I work on machine learning in Saarbrücken: anomaly detection on network traffic as a working student at consistec, next to an M.Sc. in Data Science and AI at Saarland University.',
    'Before that: drone detection with graph neural networks at DRDO, a RAG platform for health research, and three years of research on medical ML.',
    'Outside of that, V60 coffee and loud guitars.',
  ],
  /** Résumé summary paragraph. */
  summary:
    'M.Sc. Data Science and Artificial Intelligence student at Saarland University and Machine Learning working student at consistec, building anomaly detection for network traffic. Previously developed GNN-based drone detection at DRDO and a LLaMA-based RAG platform. Three years as a research assistant, with four publications and a published patent application.',
  /** Short description used for search engines and link previews. */
  description:
    'Madhvan Bajaj: machine learning working student and M.Sc. Data Science & AI student at Saarland University. Projects, publications and résumé.',
  location: 'Saarbrücken, Germany',
  /**
   * The small line at the bottom of every page. A little bit of you.
   * Change it whenever; it's meant to be current.
   */
  footerNote: 'Brewing on a V60 · Playing AC/DC',
  /**
   * Public contact email. Leave '' to hide it; LinkedIn then becomes the
   * main contact link. Anything here is visible to spam scrapers.
   * TODO: add your email if you want it on the site.
   */
  email: '',
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/madhvan-bajaj' },
    { label: 'GitHub', url: 'https://github.com/madhvanb' },
  ] satisfies SocialLink[],
  /** Main menu (top of every page). Keep it short; on phones it scrolls sideways. */
  nav: [
    { label: 'Work', path: '/work/' },
    { label: 'Notes', path: '/notes/', hideIfEmpty: 'writing' },
    { label: 'Now', path: '/now/' },
    { label: 'Music', path: '/music/' },
    { label: 'Coffee', path: '/coffee/' },
    { label: 'CV', path: '/resume/' },
  ] satisfies NavItem[],
  /** Extra links in the footer. */
  footerNav: [
    { label: 'Uses', path: '/uses/' },
    { label: 'FAQ', path: '/faq/' },
    { label: 'Colophon', path: '/colophon/' },
    { label: 'RSS', path: '/rss.xml' },
  ] satisfies NavItem[],
  /** Link to this site's source code, shown in the footer. Set to '' to hide. */
  sourceUrl: 'https://github.com/madhvanb/personal-portfolio',
};
