/**
 * Content queries used by pages.
 *
 * Pages should call these instead of `getCollection()` directly, so filtering
 * (drafts) and sorting rules live in one place and stay consistent.
 */
import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'writing'>;

/** Drafts are visible while developing locally, hidden in production builds. */
const isVisible = ({ data }: { data: { draft: boolean } }): boolean =>
  import.meta.env.DEV || !data.draft;

const newestFirst = <T extends { data: { date: Date } }>(a: T, b: T): number =>
  b.data.date.valueOf() - a.data.date.valueOf();

export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects', isVisible)).sort(newestFirst);
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.data.featured);
}

export async function getPosts(): Promise<Post[]> {
  return (await getCollection('writing', isVisible)).sort(newestFirst);
}

/** Jobs, current role first, then by start date. */
export async function getExperience(): Promise<CollectionEntry<'experience'>[]> {
  const jobs = await getCollection('experience');
  return jobs.sort((a, b) => {
    const aEnd = a.data.end?.valueOf() ?? Infinity;
    const bEnd = b.data.end?.valueOf() ?? Infinity;
    return bEnd - aEnd || b.data.start.valueOf() - a.data.start.valueOf();
  });
}

export async function getEducation(): Promise<CollectionEntry<'education'>[]> {
  return (await getCollection('education')).sort(
    (a, b) => b.data.start.valueOf() - a.data.start.valueOf(),
  );
}

export async function getPublications(): Promise<CollectionEntry<'publications'>[]> {
  return (await getCollection('publications')).sort((a, b) => b.data.year - a.data.year);
}

export async function getSkills(): Promise<CollectionEntry<'skills'>[]> {
  return (await getCollection('skills')).sort((a, b) => a.data.order - b.data.order);
}

/** Every distinct tag across projects, alphabetical. Powers the filter on /projects/. */
export function collectTags(entries: { data: { tags: string[] } }[]): string[] {
  return [...new Set(entries.flatMap((e) => e.data.tags))].sort((a, b) => a.localeCompare(b));
}
