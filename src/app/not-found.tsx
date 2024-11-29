'use client';

import Link from 'next/link';

import { ROUTE } from '@/constants/route';

import HeaderButtons from '@/components/shared/header/buttons';

import '@/styles/globals.css';

export default function NotFound() {
  return (
    <div className="flex flex-col h-screen w-full p-8">
      <HeaderButtons />
      <div className="p-20">
        <h1 className="text-3xl">Oops! Page not found. I must have made a mistake :(</h1>
        <p className="mt-4 text-2xl">
          Maybe return to the{' '}
          <Link
            href={ROUTE.index}
            className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
          >
            home page
          </Link>
          ?
        </p>
      </div>
    </div>
  );
}
