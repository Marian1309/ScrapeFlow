import type { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import { ClerkProvider } from '@clerk/nextjs';

import Providers from './providers';

import './globals.scss';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-figtree'
});

export const metadata: Metadata = {
  title: 'ScrapeFlow',
  description: 'ScrapeFlow is a tool for scraping data from websites.'
};

type Props = PropsWithChildren;

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <ClerkProvider
      afterSignOutUrl="/sign-in"
      appearance={{
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90 text-sm !shadow-none'
        }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={figtree.variable}>
          <Providers>
            <main>{children}</main>
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
