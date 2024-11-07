import type { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';
import { Figtree } from 'next/font/google';

import Providers from './providers';

import './globals.scss';

const figtree = Figtree({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-figtree'
});

export const metadata: Metadata = {
  title: 'Next.js 14 Starter App',
  description: 'Next.js 14 Basic Starter App'
};

type Props = PropsWithChildren;

const RootLayout: FC<Props> = ({ children }) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={figtree.variable}>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
