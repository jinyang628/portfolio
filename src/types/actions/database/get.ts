import { tableNameEnum } from '@/types/database/base';
import { z } from 'zod';

export const getRequestSchema = z.object({
  tableName: tableNameEnum,
  filterConditions: z.record(z.string(), z.any()),
});

export type GetRequest = z.infer<typeof getRequestSchema>;
