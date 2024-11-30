import { UserCircle } from 'lucide-react';

import NotesForm from '@/components/notes/form';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export default function NotesSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" className="side-nav-bar-btn">
          <UserCircle className="side-nav-bar-icon" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[600px] overflow-y-auto sm:w-[600px]">
        <div className="mt-8 space-y-8">
          <NotesForm />
        </div>
      </SheetContent>
    </Sheet>
  );
}
