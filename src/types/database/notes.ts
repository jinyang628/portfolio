import { Database, Tables, TablesInsert } from '@/database/database.types';
import { z } from 'zod';

export type Notes = Tables<'notes'>;
export type NotesInsert = TablesInsert<'notes'>;
export type Category = Database['public']['Enums']['category'];

/**
 * Supabase does not have a zod converter so we need to manually duplicate the types for the form component / zod checking logic which relies on zod schemas.
 * */

export const zodCategoryEnum = z.enum(['fastapi', 'github', 'react']);

export const zodNotesSchema = z.object({
  category: zodCategoryEnum,
  title: z.string(),
  description: z.string(),
});

export type ZodNotes = z.infer<typeof zodNotesSchema>;

export const defaultZodNotesValues: ZodNotes = {
  category: 'github',
  title: '',
  description: '',
};
