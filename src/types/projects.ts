import { z } from 'zod';

export const githubInfoSchema = z.object({
  url: z.string(),
  description: z.string(),
});
