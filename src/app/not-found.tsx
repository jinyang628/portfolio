'use client';

import Link from 'next/link';
import { ROUTE } from '@/constants/route';

import '@/styles/globals.css';
import HeaderButtons from '@/components/shared/header/header-buttons';

export default function NotFound() {
  return (
    <>
      <HeaderButtons />
      <main className="grow">
        <section className="not-found py-36 sm:py-24">
          <div className="container">
            <h1 className="text-40 font-medium leading-dense tracking-tighter lg:text-36 lg:leading-tight md:text-32 sm:text-28">
              Oops! Page not found. I must have made a mistake :(
            </h1>
            <p className="mt-4 max-w-lg text-18 leading-normal tracking-tight md:mt-4 sm:mt-3.5 sm:max-w-md sm:text-16 sm:leading-snug">
              Maybe return to the{' '}
              <Link
                href={ROUTE.index}
                className="font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600"
              >
                home page
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
