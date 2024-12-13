import { useEffect, useState } from 'react';
import { IoGitMergeSharp } from 'react-icons/io5';
import {
  SiAiohttp,
  SiClerk,
  SiFastapi,
  SiPython,
  SiReact,
  SiSupabase,
  SiTypescript,
  SiVisualstudiocode,
  SiXstate,
} from 'react-icons/si';

import { checkIsAdmin } from '@/actions/admin';

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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isAdmin = async () => {
      setIsAdmin(await checkIsAdmin());
    };
    isAdmin();
  }, []);

  return (
    <div className="w-[250px] flex-shrink-0">
      <div className="fixed top-[100px] w-[250px] h-[90vh]">
        <ScrollArea>
          <div className="flex flex-col justify-center space-y-2 px-2 w-[250px]">
            <h1 className="text-xl font-bold text-center">Categories</h1>
            <CategoryDropdown
              buttonText="API"
              buttonIcon={<SiAiohttp className="side-nav-bar-icon" />}
              category={'api'}
              notes={notes}
              selectedCategory={selectedCategory}
              onCategoryClick={onCategoryClick}
              onNoteClick={onNoteClick}
            />
            <CategoryDropdown
              buttonText="Clerk"
              buttonIcon={<SiClerk className="side-nav-bar-icon" />}
              category={'clerk'}
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
              buttonText="Git"
              buttonIcon={<IoGitMergeSharp className="side-nav-bar-icon" />}
              category={'git'}
              notes={notes}
              selectedCategory={selectedCategory}
              onCategoryClick={onCategoryClick}
              onNoteClick={onNoteClick}
            />
            <CategoryDropdown
              buttonText="Python"
              buttonIcon={<SiPython className="side-nav-bar-icon" />}
              category={'python'}
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
            <CategoryDropdown
              buttonText="Supabase"
              buttonIcon={<SiSupabase className="side-nav-bar-icon" />}
              category={'supabase'}
              notes={notes}
              selectedCategory={selectedCategory}
              onCategoryClick={onCategoryClick}
              onNoteClick={onNoteClick}
            />
            <CategoryDropdown
              buttonText="TypeScript"
              buttonIcon={<SiTypescript className="side-nav-bar-icon" />}
              category={'typescript'}
              notes={notes}
              selectedCategory={selectedCategory}
              onCategoryClick={onCategoryClick}
              onNoteClick={onNoteClick}
            />
            <CategoryDropdown
              buttonText="VSCode"
              buttonIcon={<SiVisualstudiocode className="side-nav-bar-icon" />}
              category={'vscode'}
              notes={notes}
              selectedCategory={selectedCategory}
              onCategoryClick={onCategoryClick}
              onNoteClick={onNoteClick}
            />
            <CategoryDropdown
              buttonText="Zustand"
              buttonIcon={<SiXstate className="side-nav-bar-icon" />}
              category={'zustand'}
              notes={notes}
              selectedCategory={selectedCategory}
              onCategoryClick={onCategoryClick}
              onNoteClick={onNoteClick}
            />
            {isAdmin && <NotesSheet />}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
