import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().max(200),
      pubDate: z.coerce.date(),
      /** Shown above the title and on the card, e.g. "Kids jiu jitsu" */
      category: z.string(),
      /** Intro paragraph in the post hero */
      lede: z.string().optional(),
      image: image().optional(),
      imageAlt: z.string().default(''),
      /** Buttons under the post body */
      ctas: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
      draft: z.boolean().default(false),
    }),
});

// The academy's privacy policy, terms and waiver (from shonenjiujitsu.com, client's permission)
const legal = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    effective: z.coerce.date(),
  }),
});

export const collections = { blog, legal };
