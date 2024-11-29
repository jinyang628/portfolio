import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
