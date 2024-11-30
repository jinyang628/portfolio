import { z } from 'zod';

export const tableNameEnum = z.enum(['notes']);
export type TableName = z.infer<typeof tableNameEnum>;
