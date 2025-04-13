'use server';

import { GET } from '@/database/client';

import { FilterRequest } from '@/types/actions/database/filter';
import { tableNameEnum } from '@/types/database/base';
import { Notes, Projects } from '@/types/database/notes';

import { logger } from '@/lib/logger';

export async function get(input: FilterRequest): Promise<Notes[] | Projects[]> {
  try {
    logger.info(`Server action get invoked on table: ${input.tableName}`);
    const data = await GET(input.tableName, input.filterConditions);
    switch (input.tableName) {
      case tableNameEnum.Values.notes:
        return data as Notes[];

      case tableNameEnum.Values.projects:
        return data as Projects[];
      default:
        logger.error(`Invalid table name: ${input.tableName}`);

        return [];
    }
  } catch (error) {
    console.error('Error in get server action: ', error);
    throw error;
  }
}
