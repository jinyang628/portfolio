import Link from 'next/link';
import { usePathname } from 'next/navigation';

import React from 'react';

import { ROUTE } from '@/constants/route';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center space-x-2">
      <Link
        href={ROUTE.index}
        className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === '/' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black-300 hover:bg-gray-700 hover:text-white'}`}
      >
        Home
      </Link>
      <Link
        href={ROUTE.cv}
        className={`rounded-md px-3 py-2 text-sm font-medium ${pathname === '/cv' ? 'bg-black text-white dark:bg-white dark:text-black' : 'text-black-300 hover:bg-gray-500 hover:text-white'}`}
      >
        CV
      </Link>
    </nav>
  );
}
