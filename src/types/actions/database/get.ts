import { z } from 'zod';

import { tableNameEnum } from '@/types/database/base';

export const getRequestSchema = z.object({
  tableName: tableNameEnum,
  filterConditions: z.record(z.string(), z.any()),
});

export type GetRequest = z.infer<typeof getRequestSchema>;
