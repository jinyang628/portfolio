import { z } from 'zod';

import { tableNameEnum } from '@/types/database/base';

export const filterRequestSchema = z.object({
  tableName: tableNameEnum,
  filterConditions: z.record(z.string(), z.any()),
});

export type FilterRequest = z.infer<typeof filterRequestSchema>;
