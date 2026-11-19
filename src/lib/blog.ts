import { getCollection } from 'astro:content';

/** Published posts, newest first. */
export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.toSorted((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime());
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
