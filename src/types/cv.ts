import { z } from 'zod';

export const CV_PNG_PATH: string = `/cv`;

export const cvStateSchema = z.object({
  imageSrcs: z.array(z.string()),
  isLoading: z.boolean(),
});
export type CVState = z.infer<typeof cvStateSchema>;
export const defaultCVState: CVState = {
  imageSrcs: [],
  isLoading: true,
};
