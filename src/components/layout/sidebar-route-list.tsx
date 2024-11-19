'use client';

import type { FC } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SIDEBAR_ROUTES from '@/constants/sidebar-routes';

import { buttonVariants } from '../ui/button';

type Props = {
  onClick?: () => void;
};

const SidebarRouteList: FC<Props> = ({ onClick }) => {
  const pathname = usePathname();

  const isActive = SIDEBAR_ROUTES.find((route) => route.href === pathname);

  return (
    <div className="flex flex-col gap-y-1 p-2">
      {SIDEBAR_ROUTES.map((route) => (
        <Link
          className={buttonVariants({
            variant: route.href === isActive?.href ? 'sidebarActiveItem' : 'sidebarItem'
          })}
          href={route.href}
          key={route._id}
          onClick={onClick}
        >
          <route.icon size={20} />
          {route.label}
        </Link>
      ))}
    </div>
  );
};

export default SidebarRouteList;
