import { z } from 'zod';

export const tableNameEnum = z.enum(['notes', 'projects']);

export type TableName = z.infer<typeof tableNameEnum>;
