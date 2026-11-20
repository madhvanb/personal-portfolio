/**
 * Content collections: the data behind the site.
 *
 * Each collection says WHERE its files live (the loader) and WHAT shape each
 * entry must have (the schema). If a file is missing a required field or has
 * a typo, `npm run dev` / `npm run build` stops with a message naming the file
 * and field. That's what keeps content edits from silently breaking pages.
 *
 *   projects     src/content/projects/*.mdx    one file per project (case study)
 *   writing      src/content/writing/*.mdx     one file per post
 *   experience   src/data/experience.yaml      list of jobs
 *   education    src/data/education.yaml       list of degrees
 *   publications src/data/publications.yaml   list of papers (can be empty)
 *   skills       src/data/skills.yaml         grouped skills
 *
 * Field-by-field docs: docs/content.md
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

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
    /** When it was finished or last meaningfully updated. Used for sorting. */
    date: z.coerce.date(),
    /** What you did on it, e.g. "Solo", "Lead, team of 3". */
    role: z.string().optional(),
    status: z.enum(['shipped', 'research', 'in-progress', 'archived']).default('shipped'),
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
    /** Your own name is bolded automatically if it matches `site.name` in src/config/site.ts. */
    authors: z.array(z.string()),
    venue: z.string(),
    year: z.number().int(),
    links,
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

export const collections = { projects, writing, experience, education, publications, skills };
