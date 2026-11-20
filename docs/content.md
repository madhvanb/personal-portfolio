# Editing content

All content lives in two places:

- `src/content/`: long-form pages written in MDX (Markdown that can also use components).
- `src/data/`: lists in YAML (experience, education, publications, skills).

Identity details (name, email, links, nav) are in `src/config/site.ts`.

Every field below is checked by a schema in `src/content.config.ts`. If you
miss a required field or mistype a date, `npm run dev` shows an error naming
the file and field. Nothing gets silently skipped.

> Content comes from your résumé. Anything the résumé left as a placeholder
> is marked `TODO` in a comment in the relevant file, never invented.
> Search the repo for `TODO` to see what's left to fill in.

## Home page

The home page is built from:

- `greeting` and `intro` (a list of short paragraphs) in `src/config/site.ts`.
- **Now**: items in `src/data/now.yaml` with `home: true`.
- **Selected work**: projects with `featured: true`.
- **Notes**: the latest three, hidden until you publish one.
- **Off the clock**: links to the Music and Coffee pages.
- **Questions people ask**: items in `src/data/faq.yaml` with `home: true` (keep it to 3).

The small line at the bottom of every page is `footerNote` in `site.ts`.

## Personal pages

| Page         | Text (Markdown)                  | Lists (YAML)                                                         |
| ------------ | -------------------------------- | -------------------------------------------------------------------- |
| `/now/`      | `src/content/pages/now.mdx`      | `src/data/now.yaml`                                                  |
| `/music/`    | `src/content/pages/music.mdx`    | `src/data/music.yaml`                                                |
| `/coffee/`   | `src/content/pages/coffee.mdx`   | `src/data/brews.yaml`, `cafes.yaml`, patent from `publications.yaml` |
| `/uses/`     | none                             | `src/data/uses.yaml`                                                 |
| `/faq/`      | none                             | `src/data/faq.yaml`                                                  |
| `/colophon/` | `src/content/pages/colophon.mdx` | none                                                                 |

Optional fields only appear once filled in. For example, a brew shows only
the recipe fields you've set, and the cafés section is hidden while
`cafes.yaml` is empty (the build prints a harmless warning about that).

Update `updated:` in `now.mdx` whenever you change your now page.

> **Leaving yourself notes:** put `# TODO` comments in the frontmatter (between
> the `---` lines), not `{/* */}` comments in the body. Prettier mangles
> multi-line MDX comments and breaks the build.

## Projects

One file per project: `src/content/projects/<slug>.mdx`. The file name
becomes the URL: `rag-assistant.mdx` → `/work/rag-assistant/`.

Extra fields: `group: work | side` (which list on /work/), `org`, `figure`
(a line drawing: networks, skies, words, health, tds, record, v60) and
`publications` (ids from `publications.yaml`, listed under the write-up).

A good write-up: the problem, what you did, the result, and what you'd do
differently. Reviewers value the last part most.

```mdx
---
title: Retrieval-Augmented Docs Assistant # required
summary: One sentence, under 200 characters. # required
date: 2026-03-01 # optional; shown as the year
order: 1 # optional; lower comes first, then newest date
role: Solo # optional, e.g. "Lead, team of 3"
status: shipped # optional: shipped | research | in-progress | archived
tags: [LLMs, RAG, Python]
featured: true # show on the home page
metrics: # optional, 2-4 headline numbers
  - { label: 'Answer accuracy', value: '87%' }
links: # all optional; only filled ones show
  code: https://github.com/...
  paper: https://arxiv.org/abs/...
  demo: https://huggingface.co/spaces/...
  model: https://huggingface.co/...
  dataset: https://...
  website: https://...
draft: false # true = visible in dev, hidden on the live site
---

## Problem

...
```

A good ML case study answers: what was the problem, what did you build and
why, how did you **measure** it, and what would you do next. Short is fine.

If no project is marked `featured`, the home page shows the first three.

## Notes

`src/content/writing/<slug>.mdx` → `/notes/<slug>/`. The Notes menu item
appears once there's a published note. `template-post.mdx` is a draft that
shows what notes can contain (maths, code, footnotes). Posts also appear in
the RSS feed at `/rss.xml`.

```mdx
---
title: Notes on evaluating LLM systems # required
description: One sentence. # required
date: 2026-02-10 # required
updated: 2026-03-01 # optional
tags: [LLMs]
draft: false
---
```

## What you can write inside MDX

Everything in normal Markdown (headings, lists, links, tables, footnotes),
plus:

**Maths** in LaTeX, rendered at build time:

```md
Inline: $p(y \mid x)$

$$
\mathcal{L} = -\sum_i y_i \log \hat{y}_i
$$
```

**Code** with monochrome highlighting: use fenced blocks with a language
(` ```python `).

**Components**: import them at the top of the file, below the frontmatter:

```mdx
import Callout from '@/components/Callout.astro';
import Figure from '@/components/Figure.astro';
import lossCurve from './images/loss-curve.png';

<Callout title="Note">Text in a box.</Callout>

<Figure src={lossCurve} alt="Training loss falling over 10 epochs" caption="Fig. 1 — Loss." />
```

Put images next to the post (e.g. `src/content/projects/images/`). Astro
optimises them automatically.

## Experience

`src/data/experience.yaml`, a list. Shown on the home page (compact) and the
résumé (with highlights).

```yaml
- id: acme-ml # required, unique
  company: Acme # required
  role: ML Engineer # required
  location: Remote
  url: https://acme.com # optional; links the company name
  start: 2025-06-01 # required
  end: 2026-01-31 # leave out for a current role → "Present"
  summary: One line on the team or product.
  highlights: # résumé bullets: lead with impact and numbers
    - Cut inference cost 40% by distilling a 7B model to 1B.
  tags: [PyTorch]
```

Ordering is automatic: current roles first, then most recent.

## Education

`src/data/education.yaml`: `id`, `institution`, `degree`, `start` required;
`location`, `end`, `notes` (list of lines) optional.

## Publications

`src/data/publications.yaml`: papers, book chapters and patents.

```yaml
- id: tuberculosis-icaia # required, unique
  title: A Study on Tuberculosis with ... # required
  kind: conference # journal | conference | chapter | patent | preprint | workshop
  venue: IEEE ICAIA # required
  year: 2023 # optional; blank in the date column if missing
  doi: 10.1109/ICAIA57370.2023.10169724 # optional; links to doi.org
  authors: [A. Author, Madhvan Bajaj] # optional; your name is bolded
  note: Application No. ... # optional extra line (patents)
  links: { code: https://... } # optional
  order: 1 # tie-breaker within the same year
```

Sorted newest year first, undated last. Your name is bolded when it matches
`name` or one of `authorAliases` in `src/config/site.ts`. Empty file (`[]`)
hides the section.

## Skills

`src/data/skills.yaml`: groups with `id`, `label`, `items` (list), `order`
(lower first). Shown on the résumé.

## Languages, awards, certifications

Résumé-only lists, each with an `order` field:

- `src/data/languages.yaml`: `name`, `level`
- `src/data/awards.yaml`: `title`, optional `detail` and `year` (free text, e.g. `'2023, 2024'`)
- `src/data/certifications.yaml`: `name`, optional `issuer` and `url`

## About facts and contact

The About section on the home page uses `about` (a short paragraph) and
`facts` (the table: Based in, Studying, ...) in `src/config/site.ts`.

`email` is empty on purpose, so it isn't exposed to spam scrapers. While it's
empty, the Contact section shows only your social links and CV.
Fill it in to show your email there and on the CV.

## Résumé PDF

The `/resume/` page is built from the files above. The **Download PDF**
button opens the print dialog. Choose "Save as PDF". A print stylesheet
removes the site chrome so it comes out as a clean CV.
