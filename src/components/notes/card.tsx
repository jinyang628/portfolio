import { useEffect, useRef } from 'react';

import { increment } from '@/actions/database/increment';
import type {} from 'ldrs';

import MarkdownRenderer from '@/components/notes/markdown-renderer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Notes } from '@/types/database/notes';

type NoteCardsProps = {
  notes: Notes[];
  selectedNoteId: number | null;
};

export default function NoteCards({ notes, selectedNoteId }: NoteCardsProps) {
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  useEffect(() => {
    if (selectedNoteId !== null) {
      const selectedCard = cardRefs.current.get(selectedNoteId);
      if (selectedCard) {
        const rect = selectedCard.getBoundingClientRect();
        window.scrollTo({
          top: window.scrollY + rect.top - window.innerHeight / 2 + rect.height / 2,
          behavior: 'smooth',
        });

        // Add animation class
        selectedCard.classList.add('animate-pulse-twice');

        // Remove animation class after animation ends
        const removeAnimation = () => {
          selectedCard.classList.remove('animate-pulse-twice');
          selectedCard.removeEventListener('animationend', removeAnimation);
        };
        selectedCard.addEventListener('animationend', removeAnimation);
      }
    }
  }, [selectedNoteId]);

  if (notes.length === 0) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <l-spiral color="hsl(var(--primary))" size={200} />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      {notes.map((note: Notes) => (
        <Card
          key={`card-${note.id}`}
          ref={(el) => {
            if (el) {
              cardRefs.current.set(note.id, el);
            }
          }}
          className="h-full w-full overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg"
          onClick={() => increment(note.id)}
        >
          <CardHeader className="pb-3">
            <CardTitle className="truncate text-2xl font-bold text-primary">{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <MarkdownRenderer note={note} />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
