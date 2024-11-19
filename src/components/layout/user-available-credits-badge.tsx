'use client';

import type { FC } from 'react';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';
import { CoinsIcon, Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { getAvailableCredits } from '@/actions/billing';

import { buttonVariants } from '../ui/button';

import ReactCountupWrapper from './react-countup-wrapper';

const UserAvailableCreditsBadge: FC = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['user-available-credits'],
    queryFn: () => getAvailableCredits(),
    refetchInterval: 30 * 1000 // 30 seconds
  });

  return (
    <Link
      className={cn(
        'w-full items-center space-x-2',
        buttonVariants({ variant: 'outline' })
      )}
      href="/billing"
    >
      <CoinsIcon className="text-primary" size={20} />
      <span className="font-semibold capitalize">
        {isLoading && <Loader2Icon className="h-4 w-4 animate-spin" />}
        {!isLoading && data && <ReactCountupWrapper value={data} />}
        {!isLoading && data === undefined && '-'}
      </span>
    </Link>
  );
};

export default UserAvailableCreditsBadge;
