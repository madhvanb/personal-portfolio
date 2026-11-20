/**
 * /rss.xml: feed of notes, so people can follow via RSS readers.
 */
import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '@/config/site';
import { getPosts } from '@/lib/content';
import { href } from '@/lib/url';

export async function GET(context: APIContext) {
  const posts = await getPosts();
  return rss({
    title: `${site.name} — Notes`,
    description: site.description,
    site: context.site ?? '',
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: href(`/notes/${post.id}/`),
    })),
  });
}
