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

## Responsive behaviour

Designed and tested for phones, tablets and laptops. Every page is checked at
19 sizes: iPhone SE (320 and 375px), iPhone 13 mini, iPhone 15 and 15 Pro Max
(portrait and landscape), iPad mini (744 and 768px, both orientations), iPad
Air, iPad Pro 11" and 13" (both orientations), laptops from 1280 to 1728px, and
1920 and 2560px desktops.

Breakpoints (in `rem`, so they respect the visitor's text size setting):

| Width          | Typical devices                                          | What changes                               |
| -------------- | -------------------------------------------------------- | ------------------------------------------ |
| < 40rem (640)  | All iPhones (portrait)                                   | Header splits into two rows; lists stack   |
| 40-60rem       | iPad mini, iPad Air, iPad Pro portrait, iPhone landscape | Date column on the left; hero stacked      |
| 60-64rem       | iPad Pro 13" portrait                                    | Hero intro and facts side by side          |
| ≥ 64rem (1024) | iPad landscape, laptops                                  | Tags get their own column in project lists |

Touch rules:

- **Tap targets are at least 44px** (Apple's guideline): nav, buttons, tags
  filter, links in lists. Whole list rows are tappable.
- **Hover effects only apply on devices that can hover** (`@media (hover:
hover)`). On iPhone/iPad, a tap shows the inverted state while pressed
  (`:active`) instead of leaving a stuck hover.
- **Notch and home bar**: `viewport-fit=cover` plus `env(safe-area-inset-*)`
  padding keeps content clear of the notch in landscape and the home bar.
- **No auto-linked numbers**: `format-detection` stops iOS turning DOIs and
  the patent number into phone links.
- Safari's toolbar colour (`theme-color`) follows the light/dark theme.
- Adding the site to the iPhone home screen uses `public/apple-touch-icon.png`.

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
