import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    image: z.string(),

    // Relation
    author: z.string(),

    // Tags
    tags: z.array(z.string()),
  }),
});

export const collections = {
  blog: blogCollection,
};
