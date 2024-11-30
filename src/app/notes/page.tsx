'use client';

import { useEffect, useState } from 'react';

import useNotes from '@/hooks/use-notes';

import NotesSideBar from '@/components/notes/side-bar';

import { Category } from '@/types/database/notes';

import { logger } from '@/lib/logger';

export default function Notes() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('github');
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

  return (
    <div className="my-5 flex bg-background h-[90%]">
      <NotesSideBar
        notes={notes}
        selectedCategory={selectedCategory}
        onCategoryClick={onCategoryClick}
      />
    </div>
  );
}
