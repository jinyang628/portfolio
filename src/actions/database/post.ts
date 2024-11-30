'use server';

import { POST } from '@/database/client';

import { PostRequest } from '@/types/actions/database/post';

import { logger } from '@/lib/logger';

export async function post(input: PostRequest): Promise<void> {
  // TODO: Update return type
  try {
    logger.info(`Server action get invoked on table: ${input.tableName}`);
    await POST(input.tableName, [input.data]);
  } catch (error) {
    console.error('Error in post server action: ', error);
    throw error;
  }
}
