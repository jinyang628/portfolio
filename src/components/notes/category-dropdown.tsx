import { Button } from '@/components/ui/button';

import { Category, Notes } from '@/types/database/notes';

type CategoryDropdownProps = {
  buttonText: string;
  buttonIcon: React.ReactNode;
  category: Category;
  notes: Notes[];
  selectedCategory: Category;
  onCategoryClick: (category: Category) => void;
  onNoteClick: (note: Notes) => void;
};

export default function CategoryDropdown({
  buttonText,
  buttonIcon,
  category,
  notes,
  selectedCategory,
  onCategoryClick,
  onNoteClick,
}: CategoryDropdownProps) {
  const notesDropdown =
    selectedCategory === category
      ? notes.map((note: Notes) => {
          return (
            <Button
              key={note.id}
              variant="outline"
              className="mx-auto w-[80%]"
              style={{
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                display: 'block',
              }}
              onClick={() => onNoteClick(note)}
            >
              {note.title}
            </Button>
          );
        })
      : [];
  return (
    <div className="flex flex-col space-y-2">
      <Button
        id={category}
        variant="ghost"
        className={`side-nav-bar-btn ${category === selectedCategory ? 'bg-muted' : ''}`}
        onClick={() => onCategoryClick(category)}
      >
        {buttonIcon}
        {buttonText}
      </Button>
      {notesDropdown}
    </div>
  );
}
