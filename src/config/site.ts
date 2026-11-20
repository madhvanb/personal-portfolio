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
  /** Path WITHOUT the base path, e.g. "/projects/". `href()` adds the base. */
  path: string;
  /** Hide this item while the named collection has no published entries. */
  hideIfEmpty?: 'writing';
}

export interface Fact {
  label: string;
  value: string;
}

export const site = {
  /** Full name. Used in the header, <title>, footer and résumé. */
  name: 'Madhvan Bajaj',
  /** Other spellings of your name in author lists, so they get bolded too. */
  authorAliases: ['M. Bajaj', 'Bajaj, M.', 'Bajaj M'],
  /** One-line role, under your name on the résumé and in page titles. */
  role: 'Machine Learning · Data Science & AI',
  /** Home page hero. Two sentences, said the way you'd say them out loud. */
  intro:
    'I build machine learning systems for messy, real-world data. Right now that means anomaly detection on network traffic at consistec, alongside an M.Sc. in Data Science and AI at Saarland University.',
  /** Résumé summary paragraph. */
  summary:
    'M.Sc. Data Science and Artificial Intelligence student at Saarland University and Machine Learning working student at consistec, building anomaly detection for network traffic. Previously developed GNN-based drone detection at DRDO and a LLaMA-based RAG platform. Three years as a research assistant, with four publications and a published patent application.',
  /** Short description used for search engines and link previews. */
  description:
    'Madhvan Bajaj: machine learning working student and M.Sc. Data Science & AI student at Saarland University. Projects, publications and résumé.',
  location: 'Saarbrücken, Germany',
  /** Key facts table on the home page. Add, remove or reorder freely. */
  facts: [
    { label: 'Now', value: 'ML working student, consistec' },
    { label: 'Studying', value: 'M.Sc. Data Science & AI, Saarland University' },
    { label: 'Focus', value: 'Anomaly detection, graph neural networks, LLMs / RAG' },
    { label: 'Based in', value: 'Saarbrücken, Germany' },
  ] satisfies Fact[],
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
  nav: [
    { label: 'Work', path: '/projects/' },
    { label: 'Writing', path: '/writing/', hideIfEmpty: 'writing' },
    { label: 'Résumé', path: '/resume/' },
  ] satisfies NavItem[],
  /** Link to this site's source code, shown in the footer. Set to '' to hide. */
  sourceUrl: 'https://github.com/madhvanb/personal-portfolio',
};
