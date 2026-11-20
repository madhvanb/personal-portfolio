# personal-portfolio

Portfolio of Madhvan Bajaj. The home page tells the work as a story in
chapters, around one question: what doesn't belong here? Plus projects, a CV
page and (optionally) writing.
Monochrome and brutalist on purpose: black, white, hard rules and big type.
Built for and tested on iPhone, iPad (including mini) and laptops.

Built with [Astro](https://astro.build). The output is plain static HTML with
almost no JavaScript, hosted free on GitHub Pages.

## Quick start

You need [Node.js](https://nodejs.org) 22 or newer. New to this? Read
[docs/getting-started.md](docs/getting-started.md) first.

```sh
npm install      # download dependencies (once, or after package.json changes)
npm run dev      # start a local server at http://localhost:4321/personal-portfolio/
```

Edit a file, save, and the browser updates on its own.

## Common tasks

| I want to…                             | Do this                                               |
| -------------------------------------- | ----------------------------------------------------- |
| Change my name, email, social links    | Edit `src/config/site.ts`                             |
| Edit the home page story               | Edit the files in `src/content/chapters/`             |
| Add a project                          | Add a file to `src/content/projects/`                 |
| Write a post                           | Add a file to `src/content/writing/`                  |
| Update experience / education / skills | Edit the YAML files in `src/data/`                    |
| Change colours, fonts, spacing         | Edit `src/styles/tokens.css`                          |
| Check everything before pushing        | `npm run verify`                                      |
| Publish                                | Push to `main`. GitHub Actions builds and deploys it. |

## Scripts

| Command              | What it does                                                    |
| -------------------- | --------------------------------------------------------------- |
| `npm run dev`        | Local dev server with live reload. Shows drafts.                |
| `npm run build`      | Build the real site into `dist/`.                               |
| `npm run preview`    | Serve `dist/` locally to check the production build.            |
| `npm run check`      | Type-check `.astro` and `.ts` files, and validate content.      |
| `npm run lint`       | Find bugs and accessibility problems (ESLint).                  |
| `npm run format`     | Auto-format every file (Prettier).                              |
| `npm run test:links` | After a build, check every internal link points somewhere real. |
| `npm run verify`     | All of the above, in order. CI runs this on every push.         |

## Documentation

- [Getting started](docs/getting-started.md): installing Node, what npm and Astro are, your first edit.
- [Editing content](docs/content.md): every field for projects, posts, experience and more.
- [Architecture](docs/architecture.md): how the code is organised and why.
- [Design system](docs/design-system.md): tokens, type, layout rules, components.
- [Deployment](docs/deployment.md): GitHub Pages, custom domains, other hosts.

## Stack

Astro 7 · TypeScript (strict) · MDX · KaTeX · plain CSS · ESLint · Prettier ·
GitHub Actions · GitHub Pages
