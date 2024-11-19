'use client';

import type { FC } from 'react';

import { useRouter } from 'next/navigation';

import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { TooltipWrapper } from '@/components/blocks';

import ExecuteBtn from './execute-btn';
import NavigationTabs from './navigation-tabs';
import PublishBtn from './publish-btn';
import SaveBtn from './save-btn';
import UnpublishBtn from './unpublish-btn';

type Props = {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  isPublished?: boolean;
};

const Topbar: FC<Props> = ({
  subtitle,
  title,
  workflowId,
  hideButtons = false,
  isPublished = false
}) => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-10 h-[60px] w-full border-separate border-b-2 bg-background p-2 flex-between">
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

      <NavigationTabs workflowId={workflowId} />

      <div className="flex flex-1 justify-end gap-1">
        {!hideButtons && (
          <>
            <ExecuteBtn workflowId={workflowId} />
            {isPublished && <UnpublishBtn workflowId={workflowId} />}
            {!isPublished && (
              <>
                <SaveBtn workflowId={workflowId} />
                <PublishBtn workflowId={workflowId} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;
