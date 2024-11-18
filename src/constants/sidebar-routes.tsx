import type { LucideIcon } from 'lucide-react';
import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from 'lucide-react';

type SidebarRoute = {
  _id: number;
  href: string;
  label: string;
  icon: LucideIcon;
};

const SIDEBAR_ROUTES: SidebarRoute[] = [
  {
    _id: 1,
    href: '/',
    label: 'Home',
    icon: HomeIcon
  },
  {
    _id: 2,
    href: '/workflows',
    label: 'Workflows',
    icon: Layers2Icon
  },
  {
    _id: 3,
    href: '/credentials',
    label: 'Credentials',
    icon: ShieldCheckIcon
  },
  {
    _id: 4,
    href: '/billing',
    label: 'Billing',
    icon: CoinsIcon
  }
];

export default SIDEBAR_ROUTES;
