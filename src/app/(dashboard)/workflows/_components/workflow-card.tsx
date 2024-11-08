'use client';

import type { FC } from 'react';

import Link from 'next/link';

import type { Workflow } from '@prisma/client';
import { FileTextIcon, PlayIcon, ShuffleIcon } from 'lucide-react';

import { WorkflowStatus } from '@/types/workflow';

import { cn } from '@/lib/utils';

import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import WorkflowActions from './workflow-actions';

type Props = {
  workflow: Workflow;
};

const statusColors = {
  [WorkflowStatus.DRAFT]: 'bg-yellow-400 text-yellow-600',
  [WorkflowStatus.PUBLISHED]: 'bg-primary'
};

const WorkflowCard: FC<Props> = ({ workflow }) => {
  const isDraft = workflow.status === WorkflowStatus.DRAFT;

  return (
    <Card className="border-separate overflow-hidden rounded-lg border shadow-sm hover:shadow-md dark:shadow-primary/30">
      <CardContent className="flex h-[100px] items-center justify-between p-4">
        <div className="flex items-center justify-end space-x-3">
          <div
            className={cn(
              'h-10 w-10 rounded-full bg-red-500 flex-center',
              statusColors[workflow.status as WorkflowStatus]
            )}
          >
            {isDraft ? (
              <FileTextIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5 text-white" />
            )}
          </div>

          <div>
            <h3 className="flex items-center text-base font-bold text-muted-foreground">
              <Link href={`/workflow/editor/${workflow.id}`}>{workflow.name}</Link>
              {isDraft && (
                <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-800">
                  Draft
                </span>
              )}
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Link
            className={cn(
              buttonVariants({ variant: 'outline', size: 'sm' }),
              'flex items-center gap-2'
            )}
            href={`/workflow/editor/${workflow.id}`}
          >
            <ShuffleIcon size={16} />
            Edit
          </Link>

          <WorkflowActions workflowId={workflow.id} workflowName={workflow.name} />
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkflowCard;
