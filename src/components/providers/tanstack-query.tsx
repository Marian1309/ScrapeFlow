'use client';

import type { FC, PropsWithChildren } from 'react';
import { useMemo } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type Props = PropsWithChildren;

const TanstackQueryProvider: FC<Props> = ({ children }) => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TanstackQueryProvider;
