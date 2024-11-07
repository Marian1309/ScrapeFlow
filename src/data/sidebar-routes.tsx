import { CoinsIcon, HomeIcon, Layers2Icon, ShieldCheckIcon } from 'lucide-react';

const SIDEBAR_ROUTES = [
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
