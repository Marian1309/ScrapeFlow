'use client';

import type { FC } from 'react';

import { BounceLoader } from 'react-spinners';

type Props = {
  loading?: boolean;
};

const GlobalLoader: FC<Props> = ({ loading = true }) => {
  return (
    <div className="min-h-screen flex-center">
      <BounceLoader color="hsl(var(--text-accent))" loading={loading} size={40} />
    </div>
  );
};

export default GlobalLoader;
