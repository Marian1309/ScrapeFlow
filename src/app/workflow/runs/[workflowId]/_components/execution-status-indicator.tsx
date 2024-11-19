import type { FC } from 'react';

import { WorkflowExecutionStatus } from '@/types/workflow';

import { cn } from '@/lib/utils';

type Props = { status: string };

const indicatorColors: Record<WorkflowExecutionStatus, string> = {
  [WorkflowExecutionStatus.PENDING]: 'bg-slate-500',
  [WorkflowExecutionStatus.RUNNING]: 'bg-yellow-500',
  [WorkflowExecutionStatus.COMPLETED]: 'bg-emerald-500',
  [WorkflowExecutionStatus.FAILED]: 'bg-red-500'
};
const ExecutionStatusIndicator: FC<Props> = ({ status }) => {
  return (
    <div
      className={cn(
        'h-2 w-2 rounded-full',
        indicatorColors[status as WorkflowExecutionStatus]
      )}
    />
  );
};

export default ExecutionStatusIndicator;
