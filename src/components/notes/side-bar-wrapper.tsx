import { FaGithub } from 'react-icons/fa';
import { SiFastapi } from 'react-icons/si';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { categoryEnum } from '@/types/notes';

export default function NotesSideBarWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-5 flex bg-background h-[90%]">
      <ScrollArea className="border-r h-full">
        <div className="w-[175px] flex flex-col justify-center space-y-2">
          <h1 className="text-xl font-bold text-center">Categories</h1>
          <Button id={categoryEnum.Values.github} variant="ghost" className="side-nav-bar-btn">
            <FaGithub className="side-nav-bar-icon" />
            Github
          </Button>
          <Button id={categoryEnum.Values.fastapi} variant="ghost" className="side-nav-bar-btn">
            <SiFastapi className="side-nav-bar-icon" />
            FastAPI
          </Button>
          {/* <ProfileSheet /> */}
        </div>
      </ScrollArea>
      {children}
    </div>
  );
}
