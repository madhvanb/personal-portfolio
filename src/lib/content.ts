/**
 * Content queries used by pages.
 *
 * Pages should call these instead of `getCollection()` directly, so filtering
 * (drafts) and sorting rules live in one place and stay consistent.
 */
import { getCollection, getEntries, getEntry, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;
export type Post = CollectionEntry<'writing'>;

/** Drafts are visible while developing locally, hidden in production builds. */
const isVisible = ({ data }: { data: { draft: boolean } }): boolean =>
  import.meta.env.DEV || !data.draft;

const newestFirst = (a: Post, b: Post): number => b.data.date.valueOf() - a.data.date.valueOf();

const byOrder = <T extends { data: { order: number } }>(a: T, b: T): number =>
  a.data.order - b.data.order;

/** By `order` (lower first), then date (newest first, undated last). */
const byOrderThenDate = (a: Project, b: Project): number =>
  a.data.order - b.data.order ||
  (b.data.date?.valueOf() ?? -Infinity) - (a.data.date?.valueOf() ?? -Infinity);

export async function getProjects(): Promise<Project[]> {
  return (await getCollection('projects', isVisible)).sort(byOrderThenDate);
}

/** Papers referenced by a project, resolved to their data. */
export async function getProjectPapers(project: Project) {
  return (await getEntries(project.data.publications)).map((p) => p.data);
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

/** Newest year first; undated entries last; `order` breaks ties. */
export async function getPublications(): Promise<CollectionEntry<'publications'>[]> {
  return (await getCollection('publications')).sort(
    (a, b) => (b.data.year ?? -Infinity) - (a.data.year ?? -Infinity) || byOrder(a, b),
  );
}

export async function getSkills(): Promise<CollectionEntry<'skills'>[]> {
  return (await getCollection('skills')).sort(byOrder);
}

export async function getLanguages(): Promise<CollectionEntry<'languages'>[]> {
  return (await getCollection('languages')).sort(byOrder);
}

export async function getAwards(): Promise<CollectionEntry<'awards'>[]> {
  return (await getCollection('awards')).sort(byOrder);
}

export async function getCertifications(): Promise<CollectionEntry<'certifications'>[]> {
  return (await getCollection('certifications')).sort(byOrder);
}

/** Generic "sorted by order" getter for the small YAML collections. */
async function ordered<C extends 'now' | 'music' | 'brews' | 'cafes' | 'uses' | 'faq'>(name: C) {
  return (await getCollection(name)).sort(byOrder);
}

export const getNow = () => ordered('now');
export const getMusic = () => ordered('music');
export const getBrews = () => ordered('brews');
export const getCafes = () => ordered('cafes');
export const getUses = () => ordered('uses');
export const getFaq = () => ordered('faq');

/** A free-text page from src/content/pages/ by file name, e.g. getPage('now'). */
export async function getPage(id: string) {
  const page = await getEntry('pages', id);
  if (!page) throw new Error(`Missing src/content/pages/${id}.mdx`);
  return page;
}
