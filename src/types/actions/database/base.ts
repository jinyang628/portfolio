import { z } from 'zod';

export const actionEnum = z.enum(['post', 'get', 'update', 'delete']);
export type Action = z.infer<typeof actionEnum>;
