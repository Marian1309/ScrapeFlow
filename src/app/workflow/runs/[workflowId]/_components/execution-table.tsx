'use client';

import type { FC } from 'react';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import { CoinsIcon } from 'lucide-react';

import type { WorkflowExecutionStatus } from '@/types/workflow';

import { datesToDurationString } from '@/lib/helper/dates';

import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

import { getWorkflowExecutions } from '@/actions/workflows';

import ExecutionStatusIndicator from './execution-status-indicator';

type InitialDataType = Awaited<ReturnType<typeof getWorkflowExecutions>>;

type Props = {
  workflowId: string;
  initialData: InitialDataType;
};

const ExecutionTable: FC<Props> = ({ workflowId, initialData }) => {
  const router = useRouter();

  const query = useQuery({
    queryKey: ['executions', workflowId],
    queryFn: () => getWorkflowExecutions(workflowId),
    initialData,
    refetchInterval: 5000
  });

  const handleRowClick = (executionId: string) => {
    router.push(`/workflow/runs/${workflowId}/${executionId}`);
  };

  return (
    <div className="overflow-auto rounded-lg border shadow-md">
      <Table className="h-full">
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead className="text-right text-xs text-muted-foreground">
              Started at (desc)
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="h-full gap-2 overflow-auto">
          {query.data.map((execution) => {
            const duration = datesToDurationString(
              new Date(execution.startedAt!),
              new Date(execution.completedAt!)
            );

            const formatedStartedAt =
              execution.startedAt &&
              formatDistanceToNow(new Date(execution.startedAt), { addSuffix: true });

            return (
              <TableRow
                className="cursor-pointer"
                key={execution.id}
                onClick={() => handleRowClick(execution.id)}
              >
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-semibold">{execution.id}</span>
                    <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                      <span>Triggered via</span>
                      <Badge variant="outline">{execution.trigger}</Badge>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <ExecutionStatusIndicator
                        status={execution.status as WorkflowExecutionStatus}
                      />
                      <span className="font-semibold capitalize">{execution.status}</span>
                    </div>
                    <div className="mx-4 text-xs text-muted-foreground">{duration}</div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <CoinsIcon className="text-primary" size={16} />
                      <span className="font-semibold capitalize">
                        {execution.creditsConsumed}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">Credits</div>
                  </div>
                </TableCell>

                <TableCell className="text-right text-muted-foreground">
                  {formatedStartedAt}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExecutionTable;
