# Getting started

This guide assumes you've never used Node, npm or Astro. It takes about 15 minutes.

## 1. What are all these tools?

**Node.js** runs JavaScript outside a browser. Almost every modern web tool
(builders, formatters, dev servers) is written in JavaScript, so Node is the
engine they all run on. You install it once.

**npm** comes with Node. It's a package manager, like `pip` for Python:

- `package.json` lists the packages this project needs, plus named commands
  ("scripts") like `dev` and `build`.
- `npm install` reads it and downloads everything into `node_modules/`.
- `package-lock.json` records the exact versions installed, so every machine
  (yours, CI) gets identical dependencies. Commit it; never edit it by hand.
- `npm run <name>` runs a script from `package.json`.

If you know Python: `package.json` ≈ `pyproject.toml`, `package-lock.json` ≈ a
lock file, `node_modules/` ≈ a virtualenv.

**Astro** is the framework. You write pages as `.astro` components (HTML plus
a bit of code at the top), and content as Markdown. Astro turns it all into
plain HTML files at build time. Visitors get fast static pages; no server
needed.

**TypeScript** is JavaScript with types. If a component expects a `title` and
you forget it, you find out in your editor, not on the live site.

## 2. Install Node

Use a version manager so upgrading later is painless.

**macOS / Linux**: install [fnm](https://github.com/Schniz/fnm), then:

```sh
fnm install 22
fnm use 22
node -v    # should print v22.x.x
```

**Windows**: install fnm with `winget install Schniz.fnm`, then the same
commands in PowerShell. Or download the "LTS" installer from
[nodejs.org](https://nodejs.org).

This repo has a `.nvmrc` file containing `22`, so `fnm use` picks the right
version automatically inside the project folder.

## 3. Get the code and run it

```sh
git clone https://github.com/madhvanb/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev
```

Open the URL it prints (http://localhost:4321/personal-portfolio/). Leave the
command running while you work. Stop it with `Ctrl+C`.

## 4. Make your first edit

Open `src/config/site.ts`, change `intro`, save. The browser updates by
itself. That file holds your name, email and links. Everything on the site
reads from it.

## 5. Editor setup

Use [VS Code](https://code.visualstudio.com). When you open the folder it will
suggest three extensions (listed in `.vscode/extensions.json`): Astro,
Prettier and ESLint. Install them. You'll get highlighting, autocomplete,
and errors shown inline as you type.

## 6. Before you push

```sh
npm run verify
```

Runs formatting, lint, type and content checks, the build, and a broken-link
check. If it passes locally, CI will pass too.

## Where next

- Add your projects and résumé: [content.md](content.md)
- Understand the code layout: [architecture.md](architecture.md)
