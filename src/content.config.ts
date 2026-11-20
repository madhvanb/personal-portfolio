/**
 * Content collections: the data behind the site.
 *
 * Each collection says WHERE its files live (the loader) and WHAT shape each
 * entry must have (the schema). If a file is missing a required field or has
 * a typo, `npm run dev` / `npm run build` stops with a message naming the file
 * and field. That's what keeps content edits from silently breaking pages.
 *
 *   chapters     src/content/chapters/*.mdx    the home page story, one file per chapter
 *   projects     src/content/projects/*.mdx    one file per project (case study)
 *   writing      src/content/writing/*.mdx     one file per post
 *   experience   src/data/experience.yaml      list of jobs
 *   education    src/data/education.yaml       list of degrees
 *   publications src/data/publications.yaml   papers, chapters, patents (can be empty)
 *   skills       src/data/skills.yaml         grouped skills
 *   languages    src/data/languages.yaml      spoken languages
 *   awards       src/data/awards.yaml         awards and activities
 *   certifications src/data/certifications.yaml
 *
 * Field-by-field docs: docs/content.md
 */
import { defineCollection, reference } from 'astro:content';
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

/** Headline numbers, e.g. { value: "+15%", label: "detection accuracy" }. */
const stats = z.array(z.object({ value: z.string(), label: z.string() })).default([]);

const chapters = defineCollection({
  loader: glob({ base: './src/content/chapters', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    /** Position in the story. Shown as "01", "02"... */
    number: z.number().int().positive(),
    /** One big word, e.g. "Skies". */
    theme: z.string(),
    /** The chapter's headline: one sentence about what you did. */
    title: z.string(),
    /** One short paragraph telling the story. */
    lede: z.string(),
    /** Where and when, shown as small labels. */
    org: z.string().optional(),
    role: z.string().optional(),
    period: z.string().optional(),
    /** Which line drawing to show. See src/components/ChapterFigure.astro. */
    figure: z.enum(['networks', 'skies', 'words', 'health', 'coffee']).optional(),
    stats,
    tags: z.array(z.string()).default([]),
    /** Papers / patents to list under this chapter (ids from publications.yaml). */
    publications: z.array(reference('publications')).default([]),
    /** A short closing section rather than a full chapter. */
    coda: z.boolean().default(false),
    /**
     * Set true once the MDX body below the frontmatter has a real write-up;
     * the chapter then gets its own page at /work/<file-name>/ and a
     * "Read the full chapter" link on the home page.
     */
    page: z.boolean().default(false),
  }),
});

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
    /** What you did on it, e.g. "Solo", "Lead, team of 3". */
    role: z.string().optional(),
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

export const collections = {
  chapters,
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
