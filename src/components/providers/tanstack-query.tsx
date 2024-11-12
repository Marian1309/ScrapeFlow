'use client';

import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const defaultQueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 хвилина
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
};

type Props = { children: ReactNode };

const TanstackQueryProvider: FC<Props> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(defaultQueryClientConfig), []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackQueryProvider;
