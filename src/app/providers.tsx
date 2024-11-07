import type { FC, PropsWithChildren } from 'react';

import { NextThemesProvider } from '@/components/providers';

type Props = PropsWithChildren;

const Providers: FC<Props> = ({ children }) => {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      themes={['light', 'dark']}
    >
      {children}
    </NextThemesProvider>
  );
};

export default Providers;
