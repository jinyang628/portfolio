'use client';

import { useForm } from 'react-hook-form';

import useNotes from '@/hooks/use-notes';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
  ZodNotes,
  defaultZodNotesValues,
  zodCategoryEnum,
  zodNotesSchema,
} from '@/types/database/notes';

export default function NotesForm() {
  const { loading, successMessage, error, refetch, postNotesMutation } = useNotes({
    id: null,
    category: null,
  });

  const form = useForm<ZodNotes>({
    resolver: zodResolver(zodNotesSchema),
    defaultValues: defaultZodNotesValues,
  });

  const onConfirmationBtnClick = async (input: ZodNotes) => {
    // TODO: For now only POST is handled, need to handle UPDATE and DELETE
    try {
      postNotesMutation.mutateAsync(input);
      form.reset(defaultZodNotesValues);
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const saveNotification = error ? (
    <span className="text-red-500">{error.message}</span>
  ) : (
    <span className="text-green-500">{successMessage}</span>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onConfirmationBtnClick)} className="space-y-8">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <div className="flex justify-start">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-[200px]">
                      {field.value || 'Select Category'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[200px]">
                    {Object.values(zodCategoryEnum.Values).map((category: string) => (
                      <DropdownMenuItem
                        key={category}
                        className="flex justify-center"
                        onClick={() => field.onChange(category)}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea className="max-h-[400px]" placeholder="Enter description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end space-x-3">
          <span className={error ? 'text-red-500' : 'text-green-500'}>{saveNotification}</span>
          <Button type="submit">{loading ? <Loader2 className="animate-spin" /> : 'Save'}</Button>
        </div>
      </form>
    </Form>
  );
}
