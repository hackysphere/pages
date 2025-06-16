import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';

const posts = await getCollection("blog");

export const GET: APIRoute = (async (context) => {
  return rss({
    title: 'hackysphere\'s blog',
    description: 'blog posts from hackysphere',
    site: context.site ?? 'http://localhost:4321',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}/`,
      author: post.data.author,
      categories: post.data.tags,
      content: post.body,
    })),
    customData: `<language>en-us</language>`,
  });
});