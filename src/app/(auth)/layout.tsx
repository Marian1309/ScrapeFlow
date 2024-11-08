import type { FC, PropsWithChildren } from 'react';

import { Logo } from '@/components/ui/custom';

type Props = PropsWithChildren;

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <div className="min-h-screen flex-col gap-4 flex-center">
      <Logo />

      {children}
    </div>
  );
};

export default AuthLayout;
