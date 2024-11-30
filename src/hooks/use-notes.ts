'use client';

import { useState } from 'react';

import { get } from '@/actions/database/get';
import { GET } from '@/database/client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { table } from 'console';

import { queryClient } from '@/components/shared/query-provider';

import { getRequestSchema } from '@/types/actions/database/get';
import { tableNameEnum } from '@/types/database/base';
import { Category, Notes } from '@/types/database/notes';

import { logger } from '@/lib/logger';

interface useNotesOptions {
  data: Notes[];
  loading: boolean;
  successMessage: string;
  error: Error | null;
  refetch: () => Promise<any>;
  //   postProfileMutation: any;
  //   updateProfileMutation: any;
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
        const getRequest = getRequestSchema.parse({
          tableName: tableNameEnum.Values.notes,
          filterConditions: filterConditions,
        });
        const notes: Notes[] = await get(getRequest);
        return notes;
      } catch (err) {
        setError(new Error('Failed to load notes'));
        return null;
      }
    },
    refetchOnWindowFocus: false,
    retry: 1,
  });

  //   const postMutation = useMutation({
  //     mutationFn: async (profile: Profile) =>
  //       sendProfile(profile, actionEnum.Values.create),
  //     mutationKey: ["createProfile"],
  //     onMutate: async (profile: Profile) => {
  //       await queryClient.cancelQueries({ queryKey: ["loadProfile"] });
  //       queryClient.setQueryData<Profile>(["loadProfile"], profile);
  //       return profile;
  //     },
  //     onSuccess: (data, profile, context) => {
  //       setSuccessMessage("Successfully created profile");
  //       return data;
  //     },
  //     onError: (err, profile, context) => {
  //       setMutationError(new Error("Failed to create profile"));
  //       queryClient.setQueryData<Profile>(["loadProfile"], profile);
  //     },
  //   });

  //   const updateMutation = useMutation({
  //     mutationFn: async (profile: Profile) =>
  //       sendProfile(profile, actionEnum.Values.update),
  //     mutationKey: ["updateProfile"],
  //     onMutate: async (profile: Profile) => {
  //       await queryClient.cancelQueries({ queryKey: ["loadProfile"] });
  //       queryClient.setQueryData<Profile>(["loadProfile"], profile);
  //       return profile;
  //     },
  //     onSuccess: (data, profile, context) => {
  //       setSuccessMessage("Successfully updated profile");
  //       return data;
  //     },
  //     onError: (err, profile, context) => {
  //       setMutationError(new Error("Failed to update profile"));
  //       queryClient.setQueryData<Profile>(["loadProfile"], profile);
  //     },
  //   });

  return {
    data: data || [],
    loading: isLoading,
    successMessage,
    error: queryError || error,
    refetch,
    // postProfileMutation: postMutation,
    // updateProfileMutation: updateMutation,
  };
}
