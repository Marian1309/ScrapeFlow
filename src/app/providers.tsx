import type { FC, PropsWithChildren } from 'react';

import { Toaster } from '@/components/ui/sonner';

import { NextThemesProvider, TanstackQueryProvider } from '@/components/providers';

type Props = PropsWithChildren;

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
