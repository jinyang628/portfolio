import { z } from 'zod';

import { tableNameEnum } from '@/types/database/base';
import { zodNotesSchema } from '@/types/database/notes';

export const postRequestSchema = z.discriminatedUnion('tableName', [
  z.object({
    tableName: z.literal(tableNameEnum.enum.notes),
    data: zodNotesSchema,
  }),
  // Add other table schemas as needed
]);

export type PostRequest = z.infer<typeof postRequestSchema>;
