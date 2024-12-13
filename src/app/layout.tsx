import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { Suspense } from 'react';

import HeaderButtons from '@/components/shared/header/buttons';
import PageLoader from '@/components/shared/page-loading-indicator';
import { QueryProvider } from '@/components/shared/query-provider';
import { ThemeProvider } from '@/components/shared/theme/provider';
import { Toaster } from '@/components/ui/toaster';

import '@/styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chen Jin Yang',
  description: 'Portfolio website of Chen Jin Yang',
  icons: {
    icon: [
      { url: '/icons/favicon.ico' },
      { url: '/icons/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/icons/apple-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7810723596683853"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <script
          type="module"
          defer
          src="https://cdn.jsdelivr.net/npm/ldrs/dist/auto/spiral.js"
        ></script>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="flex flex-col h-screen min-w-[30rem] w-full p-8">
              <HeaderButtons />
              <div className="h-full">
                <Suspense fallback={<PageLoader />}>{children}</Suspense>
              </div>
            </div>
            <Toaster />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
