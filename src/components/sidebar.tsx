'use client';

import type { FC } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SIDEBAR_ROUTES from '@/data/sidebar-routes';

import { buttonVariants } from './ui/button';
import { Logo } from './ui/custom';

const DesktopSidebar: FC = () => {
  const pathname = usePathname();

  const isActive = SIDEBAR_ROUTES.find((route) => route.href === pathname);

  return (
    <div className="relative hidden h-screen w-full min-w-[280px] max-w-[280px] border-separate overflow-hidden border-r-2 bg-primary/5 text-muted-foreground dark:bg-secondary/30 dark:text-foreground md:block">
      <div className="border-separate gap-2 border-b-[1px] p-4 flex-center">
        <Logo />
      </div>

      <div className="p-2">TODO CREDITS</div>

      <div className="flex flex-col gap-y-1 p-2">
        {SIDEBAR_ROUTES.map((route) => (
          <Link
            className={buttonVariants({
              variant: route.href === isActive?.href ? 'sidebarActiveItem' : 'sidebarItem'
            })}
            href={route.href}
            key={route._id}
          >
            <route.icon size={20} />
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebar;
