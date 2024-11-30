import { FaGithub } from 'react-icons/fa';
import { SiFastapi } from 'react-icons/si';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Category, Notes } from '@/types/database/notes';
import CategoryDropdown from '@/components/notes/category-dropdown';

type NotesSideBarProps = {
  notes: Notes[];
  selectedCategory: Category;
  onCategoryClick: (category: Category) => void;
};

export default function NotesSideBar({ notes, selectedCategory, onCategoryClick }: NotesSideBarProps) {
  return (
    <ScrollArea className="border-r h-full">
      <div className="w-[250px] flex flex-col justify-center space-y-2">
        <h1 className="text-xl font-bold text-center">Categories</h1>
        <CategoryDropdown
          buttonText="Github"
          buttonIcon={<FaGithub className="side-nav-bar-icon" />}
          category={'github'}
          notes={selectedCategory === 'github' ? notes : []}
          onCategoryClick={onCategoryClick}
        />
        <CategoryDropdown
          buttonText="FastAPI"
          buttonIcon={<SiFastapi className="side-nav-bar-icon" />}
          category={'fastapi'}
          notes={selectedCategory === 'fastapi' ? notes : []}
          onCategoryClick={onCategoryClick}
        />
        {/* <ProfileSheet /> */}
      </div>
    </ScrollArea>
  );
}
