import type { FC, ReactNode } from 'react';

import { Logo } from '@/components/layout';

type Props = { children: ReactNode };

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex-col gap-4 flex-center">
      <Logo />

      {children}
    </div>
  );
};

export default AuthLayout;
