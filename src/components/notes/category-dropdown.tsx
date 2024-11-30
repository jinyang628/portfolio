import { Button } from '@/components/ui/button';

import { Category, Notes } from '@/types/database/notes';

type CategoryDropdownProps = {
  buttonText: string;
  buttonIcon: React.ReactNode;
  category: Category;
  notes: Notes[];
  onCategoryClick: (category: Category) => void;
};

export default function CategoryDropdown({
  buttonText,
  buttonIcon,
  category,
  notes,
  onCategoryClick,
}: CategoryDropdownProps) {
  const notesDropdown = notes.map((note: Notes) => {
    return (
      <Button
        key={note.id}
        className="w-[80%] mx-auto"
        style={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          display: 'block',
        }}
      >
        {note.title}
      </Button>
    );
  });
  return (
    <div className="flex flex-col space-y-2">
      <Button
        id={category}
        variant="ghost"
        className="side-nav-bar-btn"
        onClick={() => onCategoryClick(category)}
      >
        {buttonIcon}
        {buttonText}
      </Button>
      {notesDropdown}
    </div>
  );
}
