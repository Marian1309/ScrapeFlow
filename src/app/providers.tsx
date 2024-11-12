import type { FC, ReactNode } from 'react';

import { Toaster } from '@/components/ui/sonner';

import { NextThemesProvider, TanstackQueryProvider } from '@/components/providers';

type Props = { children: ReactNode };

const Providers: FC<Props> = ({ children }) => {
  return (
    <TanstackQueryProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        themes={['light', 'dark']}
      >
        {children}

        <Toaster richColors />
      </NextThemesProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
