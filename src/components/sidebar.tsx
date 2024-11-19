'use client';

import type { FC } from 'react';
import { useState } from 'react';

import { MenuIcon } from 'lucide-react';

import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

import { Logo, SidebarRouteList, UserAvailableCreditsBadge } from './layout';

const DesktopSidebar: FC = () => {
  return (
    <div className="relative hidden h-screen w-full min-w-[280px] max-w-[280px] border-separate overflow-hidden border-r-2 bg-primary/5 text-muted-foreground dark:bg-secondary/30 dark:text-foreground md:block">
      <div className="border-separate gap-2 border-b-[1px] p-4 flex-center">
        <Logo />
      </div>

      <div className="p-2">
        <UserAvailableCreditsBadge />
      </div>

      <SidebarRouteList />
    </div>
  );
};

export const MobileSidebar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="container flex items-center justify-between">
        <Sheet onOpenChange={setIsOpen} open={isOpen}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost">
              <MenuIcon />
            </Button>
          </SheetTrigger>

          <SheetContent className="w-[400px] space-y-4 sm:w-[540px]" side="left">
            <Logo />

            <UserAvailableCreditsBadge />

            <SidebarRouteList onClick={() => setIsOpen((prev) => !prev)} />
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
};

export default DesktopSidebar;
