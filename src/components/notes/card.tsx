import { useEffect, useRef } from 'react';
import Markdown from 'react-markdown';

import type {} from 'ldrs';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Notes } from '@/types/database/notes';

import { handleCopy } from '@/lib/utils';

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
        selectedCard.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
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
      <div className="flex items-center justify-center h-full w-full">
        <l-spiral color="hsl(var(--primary))" size={200}></l-spiral>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-3">
      {notes.map((note: Notes) => (
        <Card
          key={`card-${note.id}`}
          ref={(el) => {
            if (el) cardRefs.current.set(note.id, el);
          }}
          className="w-full h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-primary/5 to-secondary/5"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-primary truncate">{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Markdown
              className="text-secondary-foreground prose prose-sm dark:prose-invert [&_code]:bg-zinc-900 [&_code]:text-white w-full max-w-none"
              components={{
                code: ({ children, className }) => {
                  // Check if this is an inline code block (no language specified)
                  const isInline = !className;

                  return (
                    <code
                      onClick={() => {
                        handleCopy(String(children), 'code snippet');
                      }}
                      className={`${isInline ? 'inline px-1.5 py-0.5' : 'block p-2'} rounded-md cursor-pointer hover:bg-zinc-800 transition-colors relative group`}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {note.description}
            </Markdown>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
