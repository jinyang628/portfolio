'use client';

import React from 'react';

import Navigation from '@/components/shared/header/navigation';
import { ThemeToggle } from '@/components/shared/theme/toggle';

export default function HeaderButtons() {
  return (
    <div className="flex w-full items-center">
      <div className="flex w-full items-center justify-between">
        <Navigation />
        <div className="flex items-center space-x-2">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}
