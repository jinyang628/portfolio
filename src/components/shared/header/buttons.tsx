'use client';

import Navigation from '@/components/shared/header/navigation';
import { ThemeToggle } from '@/components/shared/theme/toggle';

export default function HeaderButtons() {
  return (
    <div className="flex w-full items-center justify-between px gap-4">
      <Navigation />
      <ThemeToggle />
    </div>
  );
}
