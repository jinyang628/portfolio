import { z } from 'zod';

export const githubInfoSchema = z.object({
  url: z.string(),
  description: z.string(),
});

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  githubUrls: z.array(githubInfoSchema),
  youtubeUrl: z.string(),
});

export type Project = z.infer<typeof projectSchema>;
