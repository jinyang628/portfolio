'use client';

import { useEffect, useState } from 'react';

import useNotes from '@/hooks/use-notes';

import NoteCards from '@/components/notes/card';
import NotesSideBar from '@/components/notes/side-bar';
import ScrollToTop from '@/components/shared/scroll-to-top';

import { Category, Notes, zodCategoryEnum } from '@/types/database/notes';

import { logger } from '@/lib/logger';

export default function NotesPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    zodCategoryEnum.Values.algorithm,
  );
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const {
    data: notes,
    loading,
    error,
    refetch,
  } = useNotes({
    id: null,
    category: selectedCategory,
  });

  useEffect(() => {
    logger.info(`Refetch notes for category: ${selectedCategory}`);
    refetch();
  }, [selectedCategory, refetch]);

  const onCategoryClick = (category: Category) => {
    setSelectedCategory(category);
  };

  const onNoteClick = (note: Notes) => {
    setSelectedNoteId(note.id);
  };

  return (
    <div className="my-5 flex h-[90%] bg-background">
      <NotesSideBar
        notes={notes}
        selectedCategory={selectedCategory}
        onCategoryClick={onCategoryClick}
        onNoteClick={onNoteClick}
      />
      <div className="mx-5 h-full w-full">
        <NoteCards notes={notes} selectedNoteId={selectedNoteId} />
      </div>
      <ScrollToTop />
    </div>
  );
}
