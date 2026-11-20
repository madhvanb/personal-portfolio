# Design system

**Brutalist, minimal, monochrome.** The structure is the decoration:
visible rules, a strict grid, big type. No colour, no shadows, no rounded
corners, no gradients, no easing animations.

## Tokens

All values live in `src/styles/tokens.css`. Components only use variables.

### Colour

| Token           | Light     | Dark      | Use                           |
| --------------- | --------- | --------- | ----------------------------- |
| `--color-bg`    | `#ffffff` | `#000000` | Background                    |
| `--color-fg`    | `#000000` | `#ffffff` | Text, rules, borders          |
| `--color-muted` | `#555555` | `#a3a3a3` | Secondary text (AAA contrast) |
| `--color-faint` | `#e5e5e5` | `#262626` | Hairlines                     |

Dark mode swaps these four values and nothing else.

### Type

- **IBM Plex Sans** for headings and body. **IBM Plex Mono** for labels,
  metadata, tags and code. One superfamily, so they sit together naturally.
  Self-hosted via `@fontsource`; no requests to Google.
- Fluid sizes: `--text-xs` … `--text-xl`, plus `--text-display` for the
  home-page name. They scale with the viewport, so there are no breakpoint jumps.
- `.label` utility: small uppercase mono with wide tracking. Used for
  section numbers, dates, tags and nav.

### Space

4px base: `--space-1` (4px) through `--space-24` (96px).

### Lines

`--rule` (1px) separates items. `--rule-thick` (3px) opens a section.

## Interaction

- **Hover = inversion.** Rows, buttons and tags flip black ↔ white
  instantly. No fades.
- **Focus** is always a 3px outline. It's never removed.
- **Motion**: smooth scrolling only, and only if the visitor hasn't asked
  for reduced motion.

## Patterns

- **Numbered sections** (`01 SELECTED WORK`) with a thick top rule. Numbers
  are computed, so hiding a section never leaves a gap.
- **Ruled lists** for projects, posts and jobs: a table-like grid with a
  date column on the left.
- **Facts tables** (`ROLE / FOCUS / …`) for scannable key-value data.

## Writing style ("no AI-slop")

The look only works if the words are plain too.

- Say what you did and the result, with a number if you have one.
  "Cut p95 latency from 900 ms to 140 ms" beats "passionate about performance".
- Avoid: "passionate", "leveraging", "cutting-edge", "seamless", "delve",
  "in today's fast-paced world", rows of emoji.
- Short sentences. Active voice. First person.

## Changing the look

- Different font: install another `@fontsource/*` package, swap the
  imports in `BaseLayout.astro` and `--font-sans` / `--font-mono` in tokens.
- Want _one_ accent colour after all? Add `--color-accent` to tokens (both
  themes) and use it in one place, e.g. `::selection` or link hovers.
