import { Database, Tables } from '@/database/database.types';
import { z } from 'zod';

export type Notes = Tables<'notes'>;
export type Projects = Tables<'projects'>;
export type Category = Database['public']['Enums']['category'];

/**
 * Supabase does not have a zod converter so we need to manually duplicate the types for the form component / zod checking logic which relies on zod schemas.
 * */

export const zodCategoryEnum = z.enum([
  'algorithm',
  'aws',
  'api',
  'clerk',
  'extension',
  'fastapi',
  'git',
  'react',
  'supabase',
  'typescript',
  'vscode',
  'poetry',
  'python',
  'zustand',
]);

export const zodNotesSchema = z.object({
  category: zodCategoryEnum,
  title: z.string(),
  description: z.string(),
});

export type ZodNotes = z.infer<typeof zodNotesSchema>;

export const defaultZodNotesValues: ZodNotes = {
  category: zodCategoryEnum.Values.algorithm,
  title: '',
  description: '',
};
