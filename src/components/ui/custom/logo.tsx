import type { FC } from 'react';

import Link from 'next/link';

import { SquareDashedMousePointer } from 'lucide-react';

import { cn } from '@/lib/utils';

type Props = {
  fontSize?: string;
  iconSize?: number;
};

const Logo: FC<Props> = ({ fontSize = '2xl', iconSize = 20 }) => {
  return (
    <Link
      className={cn('flex items-center gap-2 text-2xl font-extralight', fontSize)}
      href="/"
    >
      <div className="rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 p-2">
        <SquareDashedMousePointer className="stroke-white" size={iconSize} />
      </div>

      <div>
        <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 bg-clip-text text-transparent">
          Flow
        </span>

        <span className="text-stone-700 dark:text-stone-300">Scrape</span>
      </div>
    </Link>
  );
};

export default Logo;
