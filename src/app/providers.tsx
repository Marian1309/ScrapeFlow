import type { FC, PropsWithChildren } from 'react';

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
      </NextThemesProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
