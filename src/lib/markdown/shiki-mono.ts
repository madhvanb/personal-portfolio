/**
 * Monochrome code-highlighting themes for Shiki (Astro's built-in highlighter).
 *
 * Off-the-shelf themes all use colour, which breaks the site's black-and-white
 * rule. These two themes encode syntax with weight and grey instead:
 *   keywords      bold
 *   comments      grey italic
 *   strings       grey
 *   everything    plain foreground
 *
 * Both are emitted as CSS variables (--shiki-light / --shiki-dark) and
 * src/styles/prose.css picks the one matching the current site theme.
 */
import type { ThemeRegistration } from 'shiki';

const mono = (name: string, fg: string, muted: string, bg: string): ThemeRegistration => ({
  name,
  type: name.endsWith('dark') ? 'dark' : 'light',
  colors: { 'editor.foreground': fg, 'editor.background': bg },
  settings: [
    { settings: { foreground: fg, background: bg } },
    {
      scope: ['keyword', 'storage', 'storage.type', 'storage.modifier', 'keyword.control'],
      settings: { fontStyle: 'bold' },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: muted, fontStyle: 'italic' },
    },
    { scope: ['string', 'string.quoted', 'constant.character'], settings: { foreground: muted } },
  ],
});

export const monoLight = mono('mono-light', '#000000', '#555555', '#ffffff');
export const monoDark = mono('mono-dark', '#ffffff', '#a3a3a3', '#000000');
