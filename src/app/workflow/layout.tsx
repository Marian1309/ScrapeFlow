import type { FC, ReactNode } from 'react';

import { Separator } from '@/components/ui/separator';

import { ThemeToggle } from '@/components/blocks';
import { Logo } from '@/components/layout';

type Props = { children: ReactNode };

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
