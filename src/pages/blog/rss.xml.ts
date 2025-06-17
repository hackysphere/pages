import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';

import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const posts = await getCollection("blog");
const parser = new MarkdownIt({html: true});

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
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
    })),
    customData: `<language>en-us</language>`,
  });
});