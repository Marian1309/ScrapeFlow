'use client';

import { type FC, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
import {
  CalendarIcon,
  CircleDashedIcon,
  ClockIcon,
  CoinsIcon,
  Loader2Icon,
  WorkflowIcon
} from 'lucide-react';

import { WorkflowExecutionStatus } from '@/types/workflow';

import { datesToDurationString } from '@/lib/helper/dates';
import { getPhasesTotalCost } from '@/lib/helper/phases';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import {
  getWorkflowExecutionWithPhases,
  getWorkflowPhaseDetails
} from '@/actions/workflows';

import ExecutionLabel from './execution-label';

type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;

type Props = {
  initialData: ExecutionData;
};

const ExecutionViewer: FC<Props> = ({ initialData }) => {
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ['execution', initialData?.id],
    initialData,
    queryFn: () => getWorkflowExecutionWithPhases(initialData!.id),
    refetchInterval: (q) =>
      q.state.data?.status === WorkflowExecutionStatus.RUNNING ? 1000 : false,
    refetchOnMount: false,
    refetchOnWindowFocus: false
  });

  const phaseDetails = useQuery({
    queryKey: ['phaseDetails', selectedPhase],
    enabled: selectedPhase !== null,
    queryFn: () => getWorkflowPhaseDetails(selectedPhase!)
  });

  const isRunning = data?.status === WorkflowExecutionStatus.RUNNING;

  const duration =
    data?.startedAt && data?.completedAt
      ? datesToDurationString(new Date(data.startedAt), new Date(data.completedAt))
      : null;

  const creditsConsumed = getPhasesTotalCost(data?.phases || []);

  return (
    <div className="flex h-full w-full">
      <aside className="w-[440px] min-w-[440px] max-w-[440px] border-r-2 border-separate flex flex-grow flex-col overflow-hidden">
        <div className="py-4 px-2">
          <ExecutionLabel icon={CircleDashedIcon} label="Status" value={data!.status} />

          <ExecutionLabel
            icon={CalendarIcon}
            label="Started"
            value={
              <span className="lowercase">
                {data?.startedAt
                  ? formatDistanceToNow(new Date(data.startedAt), { addSuffix: true })
                  : 'N/A'}
              </span>
            }
          />

          <ExecutionLabel
            icon={ClockIcon}
            label="Duration"
            value={
              duration ? duration : <Loader2Icon className="animate-spin" size={20} />
            }
          />
          <ExecutionLabel
            icon={CoinsIcon}
            label="Credits consumed"
            value={creditsConsumed}
          />
        </div>

        <Separator />

        <div className="flex-center py-2 px-4">
          <div className="flex items-center gap-y-2 text-accent-foreground">
            <WorkflowIcon className="stroke-muted-foreground/80" size={20} />
            <span className="font-semibold">Phases</span>
          </div>
        </div>

        <Separator />

        <div className="overflow-auto h-full px-2 py-4">
          {data?.phases.map((phase) => (
            <Button
              className="w-full justify-between"
              key={phase.id}
              onClick={() => {
                if (isRunning) return;

                setSelectedPhase(phase.id);
              }}
              variant={selectedPhase === phase.id ? 'secondary' : 'ghost'}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline">{phase.number}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>
              <p className="text-xs text-muted-foreground">{phase.status}</p>
            </Button>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default ExecutionViewer;
