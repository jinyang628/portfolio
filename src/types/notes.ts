import { z } from 'zod';

export const categoryEnum = z.enum(['github', 'fastapi']);
export type Category = z.infer<typeof categoryEnum>;

export const entrySchema = z.object({
  category: categoryEnum,
  title: z.string(),
  description: z.string(),
});

export type Entry = z.infer<typeof entrySchema>;
