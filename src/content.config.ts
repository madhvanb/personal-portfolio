/**
 * Content collections: the data behind the site.
 *
 * Each collection says WHERE its files live (the loader) and WHAT shape each
 * entry must have (the schema). If a file is missing a required field or has
 * a typo, `npm run dev` / `npm run build` stops with a message naming the file
 * and field. That's what keeps content edits from silently breaking pages.
 *
 *   projects     src/content/projects/*.mdx    one file per project (case study) → /work/
 *   writing      src/content/writing/*.mdx     one file per note → /notes/
 *   pages        src/content/pages/*.mdx       free text for Now, Music, Coffee, Colophon...
 *   experience   src/data/experience.yaml      list of jobs
 *   education    src/data/education.yaml       list of degrees
 *   publications src/data/publications.yaml   papers, chapters, patents (can be empty)
 *   skills       src/data/skills.yaml         grouped skills
 *   languages    src/data/languages.yaml      spoken languages
 *   awards       src/data/awards.yaml         awards and activities
 *   certifications src/data/certifications.yaml
 *   now          src/data/now.yaml            what you're up to (home + /now/)
 *   music        src/data/music.yaml          artists (/music/)
 *   brews        src/data/brews.yaml          coffee recipes (/coffee/)
 *   cafes        src/data/cafes.yaml          favourite cafés (/coffee/)
 *   uses         src/data/uses.yaml           tools and gear (/uses/)
 *   faq          src/data/faq.yaml            questions people ask (/faq/)
 *
 * Field-by-field docs: docs/content.md
 */
import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { DRAWINGS } from './lib/drawings';

/** Optional external links. Only the ones you fill in are shown. */
const links = z
  .object({
    code: z.url().optional(),
    paper: z.url().optional(),
    demo: z.url().optional(),
    model: z.url().optional(),
    dataset: z.url().optional(),
    website: z.url().optional(),
  })
  .default({});

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    /** One sentence. Shown in lists and link previews. */
    summary: z.string().max(200),
    /** When it was finished or last meaningfully updated. Shown as the year. Optional. */
    date: z.coerce.date().optional(),
    /** Manual sort position: lower comes first. Ties are broken by date, newest first. */
    order: z.number().default(100),
    /** What you did on it, e.g. "Solo", "Lead, team of 3", "ML Intern". */
    role: z.string().optional(),
    /** Where, e.g. "DRDO" or "consistec". Leave out for personal projects. */
    org: z.string().optional(),
    /** "work" = from jobs and research, shown first; "side" = side projects. */
    group: z.enum(['work', 'side']).default('side'),
    /** Line drawing shown on the project page. See src/components/LineDrawing.astro. */
    figure: z.enum(DRAWINGS).optional(),
    /** Related papers / patents (ids from src/data/publications.yaml). */
    publications: z.array(reference('publications')).default([]),
    status: z.enum(['shipped', 'research', 'in-progress', 'archived']).optional(),
    tags: z.array(z.string()).default([]),
    /** Featured projects appear on the home page. */
    featured: z.boolean().default(false),
    /** Headline numbers, e.g. { label: "Top-1 acc.", value: "91.4%" }. Keep to 2-4. */
    metrics: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
    links,
    /** Drafts show up in `npm run dev` but are left out of the real site. */
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ base: './src/content/writing', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(200),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

const experience = defineCollection({
  loader: file('src/data/experience.yaml'),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string().optional(),
    url: z.url().optional(),
    start: z.coerce.date(),
    /** Leave out for a current role; it shows as "Present". */
    end: z.coerce.date().optional(),
    summary: z.string().optional(),
    /** Résumé bullet points. Lead with impact and numbers. */
    highlights: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

const education = defineCollection({
  loader: file('src/data/education.yaml'),
  schema: z.object({
    institution: z.string(),
    degree: z.string(),
    location: z.string().optional(),
    start: z.coerce.date(),
    end: z.coerce.date().optional(),
    notes: z.array(z.string()).default([]),
  }),
});

const publications = defineCollection({
  loader: file('src/data/publications.yaml'),
  schema: z.object({
    title: z.string(),
    kind: z.enum(['journal', 'conference', 'chapter', 'patent', 'preprint', 'workshop']),
    /** Your own name is bolded if it matches `site.name` or `site.authorAliases`. */
    authors: z.array(z.string()).default([]),
    /** Journal, conference, book or patent office. */
    venue: z.string(),
    year: z.number().int().optional(),
    /** e.g. "10.1109/ICAIA57370.2023.10169724". Rendered as a link to doi.org. */
    doi: z.string().optional(),
    /** Extra line, e.g. a patent application number. */
    note: z.string().optional(),
    links,
    /** Tie-breaker within a year; lower comes first. */
    order: z.number().default(0),
  }),
});

const skills = defineCollection({
  loader: file('src/data/skills.yaml'),
  schema: z.object({
    /** Group label, e.g. "ML / DL". */
    label: z.string(),
    items: z.array(z.string()),
    /** Lower numbers come first. */
    order: z.number().default(0),
  }),
});

const languages = defineCollection({
  loader: file('src/data/languages.yaml'),
  schema: z.object({
    name: z.string(),
    /** e.g. "Native", "C1", "A1". */
    level: z.string(),
    order: z.number().default(0),
  }),
});

const awards = defineCollection({
  loader: file('src/data/awards.yaml'),
  schema: z.object({
    title: z.string(),
    detail: z.string().optional(),
    /** Free text so "2023, 2024" works. */
    year: z.string().optional(),
    order: z.number().default(0),
  }),
});

const certifications = defineCollection({
  loader: file('src/data/certifications.yaml'),
  schema: z.object({
    name: z.string(),
    issuer: z.string().optional(),
    url: z.url().optional(),
    order: z.number().default(0),
  }),
});

/** Free-text pages (Now, Music, Coffee, Colophon...). The body is the page text. */
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Shown as "Last updated". Useful on /now/. */
    updated: z.coerce.date().optional(),
  }),
});

const now = defineCollection({
  loader: file('src/data/now.yaml'),
  schema: z.object({
    /** Short label, e.g. "Working", "Learning", "Brewing". */
    label: z.string(),
    text: z.string(),
    /** Show on the home page too (keep it to 3-5). */
    home: z.boolean().default(true),
    order: z.number().default(0),
  }),
});

const music = defineCollection({
  loader: file('src/data/music.yaml'),
  schema: z.object({
    artist: z.string(),
    /** Your favourite album, if you want to name one. */
    album: z.string().optional(),
    /** One line in your own words. */
    note: z.string().optional(),
    url: z.url().optional(),
    order: z.number().default(0),
  }),
});

const brews = defineCollection({
  loader: file('src/data/brews.yaml'),
  schema: z.object({
    name: z.string(),
    method: z.string(),
    /** Every field below is optional; only filled ones are shown. */
    beans: z.string().optional(),
    dose: z.string().optional(),
    water: z.string().optional(),
    grind: z.string().optional(),
    temperature: z.string().optional(),
    time: z.string().optional(),
    steps: z.array(z.string()).default([]),
    note: z.string().optional(),
    order: z.number().default(0),
  }),
});

const cafes = defineCollection({
  loader: file('src/data/cafes.yaml'),
  schema: z.object({
    name: z.string(),
    city: z.string(),
    note: z.string().optional(),
    url: z.url().optional(),
    order: z.number().default(0),
  }),
});

const uses = defineCollection({
  loader: file('src/data/uses.yaml'),
  schema: z.object({
    label: z.string(),
    items: z.array(z.object({ name: z.string(), note: z.string().optional() })),
    order: z.number().default(0),
  }),
});

const faq = defineCollection({
  loader: file('src/data/faq.yaml'),
  schema: z.object({
    question: z.string(),
    /** Plain text. Blank lines start new paragraphs. */
    answer: z.string(),
    /** Show on the home page (keep it to 3). */
    home: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = {
  pages,
  now,
  music,
  brews,
  cafes,
  uses,
  faq,
  projects,
  writing,
  experience,
  education,
  publications,
  skills,
  languages,
  awards,
  certifications,
};
