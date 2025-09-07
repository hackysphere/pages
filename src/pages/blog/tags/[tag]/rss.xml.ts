import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import rss from "@astrojs/rss";

import MarkdownIt from 'markdown-it';
import sanitizeHtml from 'sanitize-html';

const parser = new MarkdownIt({"html": true});

export const GET: APIRoute = (async (context) => {
  // this is mainly defined so that typescript doesn't error out on sorting the post list
  const posts = context.props.posts as CollectionEntry<"blog">[];

  return rss({
    title: 'hackysphere\'s blog',
    description: 'blog posts from hackysphere',
    site: context.site ?? 'http://localhost:4321',
    items: posts
      .sort((post1, post2) => post2.data.pubDate.valueOf() - post1.data.pubDate.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.pubDate,
        description: post.data.description,
        link: `/blog/${post.id}/`,
        author: post.data.author,
        categories: post.data.tags,
        content: sanitizeHtml(parser.render(post.body as string), {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
        }),
      })),
    customData: `<language>en-us</language>`
  });
});

export const getStaticPaths = ( async () => {
  const allPosts = await getCollection("blog");
  const tags = [...new Set(
    allPosts
    .filter((post) => Array.isArray(post.data.tags))
    .flatMap((post) => post.data.tags as string[])
  )];

  return tags.map((tag) => ({
      params: {tag},
      props: {posts: allPosts
          .filter((post) => post.data.tags?.includes(tag))
          .sort((post1, post2) => post2.data.pubDate.valueOf() - post1.data.pubDate.valueOf())}
  }));
}) satisfies GetStaticPaths;
