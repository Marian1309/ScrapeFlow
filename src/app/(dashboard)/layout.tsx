import type { FC, PropsWithChildren } from 'react';

import { SignedIn, UserButton } from '@clerk/nextjs';

import { Separator } from '@/components/ui/separator';

import { BreadcrumbHeader, ThemeToggle } from '@/components/blocks';
import DesktopSidebar, { MobileSidebar } from '@/components/sidebar';

type Props = PropsWithChildren;

const DashboardLayout: FC<Props> = ({ children }) => {
  return (
    <div className="flex h-screen">
      <DesktopSidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex h-[50px] items-center justify-between px-6 py-4">
          <MobileSidebar />
          <BreadcrumbHeader />

          <div className="flex items-center gap-1 gap-x-2">
            <ThemeToggle />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>

        <Separator />

        <div className="overflow-auto">
          <div className="container flex-1 py-4 text-accent-foreground">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
