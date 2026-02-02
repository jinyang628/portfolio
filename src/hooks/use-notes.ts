'use client';

import { useState } from 'react';

import { get } from '@/actions/database/get';
import { post } from '@/actions/database/post';
import { useMutation, useQuery } from '@tanstack/react-query';

import { filterRequestSchema } from '@/types/actions/database/filter';
import { postRequestSchema } from '@/types/actions/database/post';
import { tableNameEnum } from '@/types/database/base';
import { Category, Notes, ZodNotes } from '@/types/database/notes';

interface useNotesOptions {
  data: Notes[];
  loading: boolean;
  successMessage: string;
  error: Error | null;
  refetch: () => Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
  postNotesMutation: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

interface useNotesProps {
  id: number | null;
  category: Category | null;
}

export default function useNotes({ id, category }: useNotesProps): useNotesOptions {
  const [error, setError] = useState<Error | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');

  const {
    data,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ['loadNotes', id, category],
    queryFn: async () => {
      try {
        const filterConditions: Partial<Notes> = {};
        if (id) {
          filterConditions.id = id;
        }
        if (category) {
          filterConditions.category = category;
        }
        const getRequest = filterRequestSchema.parse({
          tableName: tableNameEnum.Values.notes,
          filterConditions: filterConditions,
        });
        const notes = (await get(getRequest)) as Notes[];

        return notes;
      } catch (err) {
        setError(new Error('Failed to load notes'));

        return null;
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const postMutation = useMutation({
    mutationFn: async (note: ZodNotes) => {
      const postRequest = postRequestSchema.parse({
        tableName: tableNameEnum.Values.notes,
        data: note,
      });
      await post(postRequest);
    },
    mutationKey: ['postProfile'],
    onSuccess: (data, profile, context) => {
      setSuccessMessage('Successfully created note entry');

      return data;
    },
    onError: (err, profile, context) => {
      setError(new Error('Failed to create note entry'));
    },
  });

  return {
    data: data || [],
    loading: isLoading,
    successMessage,
    error: queryError || error,
    refetch,
    postNotesMutation: postMutation,
  };
}
