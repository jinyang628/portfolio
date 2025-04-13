'use server';

import { getSupabaseClient } from '@/database/client';

export async function increment(note_id: number): Promise<void> {
  try {
    const client = await getSupabaseClient();
    const { data, error } = await client.rpc('increment_note_counter', { note_id: note_id });

    if (error) {
      console.error('Supabase RPC error:', error);
      throw error;
    }
    console.log('RPC call successful, updated data:', data);
  } catch (error) {
    console.error('Error in post server action: ', error);
    throw error;
  }
}
