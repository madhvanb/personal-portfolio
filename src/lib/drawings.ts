/** Names of the line drawings in src/components/LineDrawing.astro. */
export const DRAWINGS = ['networks', 'skies', 'words', 'health', 'tds', 'record', 'v60'] as const;
export type Kind = (typeof DRAWINGS)[number];
