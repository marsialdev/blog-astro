import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogCollection = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string(),
      image: image(),

      // Relation
      author: reference('author'),

      // Tags
      tags: z.array(z.string()),

      // Boolean
      isDraft: z.boolean().default(false),
    }),
});

const authorCollection = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/author' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      avatar: image(),
    }),
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
