import { Database, Tables } from '@/database/database.types';

export type Notes = Tables<'notes'>;
export type Category = Database['public']['Enums']['category'];
