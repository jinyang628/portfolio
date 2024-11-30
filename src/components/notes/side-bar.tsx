import { FaGithub } from 'react-icons/fa';
import { SiFastapi, SiReact } from 'react-icons/si';

import CategoryDropdown from '@/components/notes/category-dropdown';
import NotesSheet from '@/components/notes/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Category, Notes } from '@/types/database/notes';

type NotesSideBarProps = {
  notes: Notes[];
  selectedCategory: Category;
  onCategoryClick: (category: Category) => void;
  onNoteClick: (note: Notes) => void;
};

export default function NotesSideBar({
  notes,
  selectedCategory,
  onCategoryClick,
  onNoteClick,
}: NotesSideBarProps) {
  return (
    // TODO: Show the most updated content in the notes (probably need to refresh the page?)
    <ScrollArea className="flex-shrink-0">
      <div className="w-[250px] border-r flex flex-col justify-center space-y-2">
        <h1 className="text-xl font-bold text-center">Categories</h1>
        <CategoryDropdown
          buttonText="Github"
          buttonIcon={<FaGithub className="side-nav-bar-icon" />}
          category={'github'}
          notes={notes}
          selectedCategory={selectedCategory}
          onCategoryClick={onCategoryClick}
          onNoteClick={onNoteClick}
        />
        <CategoryDropdown
          buttonText="FastAPI"
          buttonIcon={<SiFastapi className="side-nav-bar-icon" />}
          category={'fastapi'}
          notes={notes}
          selectedCategory={selectedCategory}
          onCategoryClick={onCategoryClick}
          onNoteClick={onNoteClick}
        />
        <CategoryDropdown
          buttonText="React"
          buttonIcon={<SiReact className="side-nav-bar-icon" />}
          category={'react'}
          notes={notes}
          selectedCategory={selectedCategory}
          onCategoryClick={onCategoryClick}
          onNoteClick={onNoteClick}
        />
        <NotesSheet />
      </div>
    </ScrollArea>
  );
}
