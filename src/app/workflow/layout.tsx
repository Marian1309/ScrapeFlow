import type { FC, ReactNode } from 'react';

import { Logo } from '@/components/ui/custom';
import { Separator } from '@/components/ui/separator';

import { ThemeToggle } from '@/components/blocks';

type Props = {
  children: ReactNode;
};

const WorkflowLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen w-full flex-col">
      <main className="flex-1">{children}</main>

      <Separator />

      <footer className="p-2 flex-between">
        <Logo fontSize="text-xl" iconSize={16} />
        <ThemeToggle />
      </footer>
    </div>
  );
};

export default WorkflowLayout;
