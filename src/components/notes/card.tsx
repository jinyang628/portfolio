import type {} from 'ldrs';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Notes } from '@/types/database/notes';

type NoteCardsProps = {
  notes: Notes[];
};

export default function NoteCards({ notes }: NoteCardsProps) {
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
          className="w-full h-full overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] bg-gradient-to-br from-primary/5 to-secondary/5"
        >
          <CardHeader className="pb-3">
            <CardTitle className="text-2xl font-bold text-primary truncate">{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-secondary-foreground line-clamp-4">{note.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
