/**
 * KaTeX plugin for Astro's Markdown processor (Sätteri).
 *
 * With `features.math` on, Sätteri parses `$x$` (inlineMath) and `$$...$$`
 * (math) but leaves rendering to plugins. This one replaces each maths node
 * with KaTeX's HTML at build time, so readers download no maths JavaScript;
 * only katex.min.css, which ArticleLayout imports.
 *
 * It runs on the Markdown tree (mdast) rather than the HTML tree, because
 * that's where raw HTML can be inserted in both .md and .mdx files.
 *
 * A malformed equation fails the build with KaTeX's error message instead of
 * shipping a broken page.
 */
import katex from 'katex';
import { defineMdastPlugin } from 'satteri';

const render = (tex: string, displayMode: boolean) => ({
  raw: katex.renderToString(tex, {
    displayMode,
    throwOnError: true,
    output: 'htmlAndMathml', // MathML keeps equations readable by screen readers
  }),
  // KaTeX output contains `{`; don't let MDX read it as a JS expression.
  mdxExpressions: false,
});

export const katexPlugin = defineMdastPlugin({
  name: 'katex',
  math(node, ctx) {
    ctx.replaceNode(node, render(node.value, true));
  },
  inlineMath(node, ctx) {
    ctx.replaceNode(node, render(node.value, false));
  },
});
