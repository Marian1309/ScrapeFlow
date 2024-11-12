'use client';

import type { FC } from 'react';

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { TooltipWrapper } from '@/components/blocks';

import SaveBtn from './save-btn';

type Props = {
  title: string;
  subtitle?: string;
  workflowId: string;
};

const Topbar: FC<Props> = ({ subtitle, title, workflowId }) => {
  const router = useRouter();

  return (
    <header className="border-p-2 sticky top-0 z-10 flex h-[60px] w-full border-separate justify-between bg-background p-2">
      <div className="flex flex-1 items-center gap-1">
        <TooltipWrapper content="Back">
          <Button onClick={() => router.back()} variant="ghost">
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
        </TooltipWrapper>

        <div>
          <p className="truncate text-ellipsis font-bold">{title}</p>
          {subtitle && (
            <p className="truncate text-ellipsis text-xs text-muted-foreground">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 justify-end gap-1">
        <SaveBtn workflowId={workflowId} />
      </div>
    </header>
  );
};

export default Topbar;
