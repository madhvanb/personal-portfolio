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
  /**
   * Home page hero. `question` is the huge line; `intro` sits under it.
   * The question is the thread through every chapter of the story.
   */
  hero: {
    question: "What doesn't belong here?",
    intro:
      "I'm Madhvan. I build machine learning that finds the odd one out: in network traffic, in crowded airspace, in machine-written text and in medical data. Right now I'm a machine learning working student at consistec and an M.Sc. Data Science & AI student at Saarland University.",
  },
  /** About section on the home page. A few honest sentences in first person. */
  about:
    'I grew up on research: three years as a research assistant during my B.Tech., four papers and a patent application before graduating. Now I care most about models that hold up outside the notebook: fast enough for real time, explainable enough that someone acts on the alert.',
  /** Résumé summary paragraph. */
  summary:
    'M.Sc. Data Science and Artificial Intelligence student at Saarland University and Machine Learning working student at consistec, building anomaly detection for network traffic. Previously developed GNN-based drone detection at DRDO and a LLaMA-based RAG platform. Three years as a research assistant, with four publications and a published patent application.',
  /** Short description used for search engines and link previews. */
  description:
    'Madhvan Bajaj: machine learning working student and M.Sc. Data Science & AI student at Saarland University. Projects, publications and résumé.',
  location: 'Saarbrücken, Germany',
  /** Facts table in the About section. Add, remove or reorder freely. */
  facts: [
    { label: 'Based in', value: 'Saarbrücken, Germany' },
    { label: 'Studying', value: 'M.Sc. Data Science & AI, Saarland University' },
    { label: 'Before', value: 'B.Tech. CSE (ML & AI), Graphic Era Hill University' },
    { label: 'Languages', value: 'Hindi, English (C1), German (A1)' },
    { label: 'Also', value: 'Amazon ML Summer School 2022 · ACM chapter treasurer' },
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
    { label: 'Work', path: '/#work' },
    { label: 'Projects', path: '/projects/' },
    { label: 'Writing', path: '/writing/', hideIfEmpty: 'writing' },
    { label: 'CV', path: '/resume/' },
  ] satisfies NavItem[],
  /** Link to this site's source code, shown in the footer. Set to '' to hide. */
  sourceUrl: 'https://github.com/madhvanb/personal-portfolio',
};
