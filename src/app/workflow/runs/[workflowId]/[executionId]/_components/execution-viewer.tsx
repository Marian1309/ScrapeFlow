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
import LogViewer from './log-viewer';
import ParameterViewer from './parameter-viewer';

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

      <div className="flex w-full h-full px-3">
        {isRunning && (
          <div className="w-full h-full flex-center flex-col gap-2">
            <p className="font-bold">Run is in progress, please wait...</p>
          </div>
        )}

        {!isRunning && !selectedPhase && (
          <div className="flex-center flex-col gap-2 w-full h-full">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">
                Please select a phase to view details
              </p>
            </div>
          </div>
        )}

        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="flex flex-col py-4 container gap-4 overflow-auto">
            <div className="flex gap-2 items-center">
              <Badge className="space-x-4" variant="outline">
                <CoinsIcon className="stroke-muted-foreground" size={18} />
                <span>Credits</span>
                <span>TODO</span>
              </Badge>

              <Badge className="space-x-4" variant="outline">
                <ClockIcon className="stroke-muted-foreground" size={18} />
                <span>Duration</span>
                <span>
                  {datesToDurationString(
                    new Date(phaseDetails.data.startedAt!),
                    new Date(phaseDetails.data.completedAt!)
                  )}
                </span>
              </Badge>
            </div>

            <ParameterViewer
              paramsJSON={phaseDetails.data.inputs || ''}
              subTitle="Inputs"
              title="Inputs"
            />

            <ParameterViewer
              paramsJSON={phaseDetails.data.outputs || ''}
              subTitle="Outputs"
              title="Outputs"
            />

            <LogViewer logs={phaseDetails.data.logs || ''} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionViewer;
