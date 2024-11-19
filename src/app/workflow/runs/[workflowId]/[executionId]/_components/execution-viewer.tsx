'use client';

import type { FC } from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';

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

import type { ExecutionPhaseStatus } from '@/types/workflow';
import { WorkflowExecutionStatus } from '@/types/workflow';

import { datesToDurationString } from '@/lib/helper/dates';
import getPhasesTotalCost from '@/lib/helper/phases';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

import ReactCountupWrapper from '@/components/layout/react-countup-wrapper';

import {
  getWorkflowExecutionWithPhases,
  getWorkflowPhaseDetails
} from '@/actions/workflows';

import ExecutionLabel from './execution-label';
import LogViewer from './log-viewer';
import ParameterViewer from './parameter-viewer';
import PhaseStatusBadge from './phase-status-badge';

type ExecutionData = Awaited<ReturnType<typeof getWorkflowExecutionWithPhases>>;

type Props = { initialData: ExecutionData };

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

  const duration = useMemo(() => {
    return data?.startedAt && data?.completedAt
      ? datesToDurationString(new Date(data.startedAt), new Date(data.completedAt))
      : null;
  }, [data?.startedAt, data?.completedAt]);

  const creditsConsumed = useMemo(() => {
    return getPhasesTotalCost(data?.phases || []);
  }, [data?.phases]);

  const handlePhaseClick = useCallback(
    (phaseId: string) => {
      if (isRunning) return;
      setSelectedPhase(phaseId);
    },
    [isRunning]
  );

  useEffect(() => {
    const phases = data?.phases || [];

    if (isRunning) {
      const phaseToSelect = phases.toSorted((a, b) =>
        a.startedAt! > b.startedAt! ? -1 : 1
      )[0];

      setSelectedPhase(phaseToSelect.id);
      return;
    }

    const phaseToSelect = phases.toSorted((a, b) =>
      a.completedAt! > b.completedAt! ? -1 : 1
    )[0];

    setSelectedPhase(phaseToSelect.id);
  }, [data?.phases, isRunning]);

  return (
    <div className="flex h-full w-full">
      <aside className="flex w-[440px] min-w-[440px] max-w-[440px] flex-grow border-separate flex-col overflow-hidden border-r-2">
        <div className="px-2 py-4">
          <ExecutionLabel
            icon={CircleDashedIcon}
            label="Status"
            value={
              <div className="flex items-center gap-2 font-semibold capitalize">
                <PhaseStatusBadge status={data?.status as ExecutionPhaseStatus} />
                <span>{data?.status}</span>
              </div>
            }
          />

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
            value={<ReactCountupWrapper value={creditsConsumed} />}
          />
        </div>

        <Separator />

        <div className="px-4 py-2 flex-center">
          <div className="flex items-center gap-y-2 text-accent-foreground">
            <WorkflowIcon className="stroke-muted-foreground/80" size={20} />
            <span className="font-semibold">Phases</span>
          </div>
        </div>

        <Separator />

        <div className="h-full overflow-auto px-2 py-4">
          {data?.phases.map((phase) => (
            <Button
              className="w-full justify-between"
              key={phase.id}
              onClick={() => handlePhaseClick(phase.id)}
              variant={selectedPhase === phase.id ? 'secondary' : 'ghost'}
            >
              <div className="flex items-center gap-2">
                <Badge variant="outline">{phase.number}</Badge>
                <p className="font-semibold">{phase.name}</p>
              </div>

              <PhaseStatusBadge status={phase.status as ExecutionPhaseStatus} />
            </Button>
          ))}
        </div>
      </aside>

      <div className="flex h-full w-full px-3">
        {isRunning && (
          <div className="h-full w-full flex-col gap-2 flex-center">
            <p className="font-bold">Run is in progress, please wait...</p>
          </div>
        )}

        {!isRunning && !selectedPhase && (
          <div className="h-full w-full flex-col gap-2 flex-center">
            <div className="flex flex-col gap-1 text-center">
              <p className="font-bold">No phase selected</p>
              <p className="text-sm text-muted-foreground">
                Please select a phase to view details
              </p>
            </div>
          </div>
        )}

        {!isRunning && selectedPhase && phaseDetails.data && (
          <div className="container flex flex-col gap-4 overflow-auto py-4">
            <div className="flex items-center gap-2">
              <Badge className="space-x-4" variant="outline">
                <CoinsIcon className="stroke-muted-foreground" size={18} />
                <span>Credits</span>
                <span>{phaseDetails.data?.creditsConsumed}</span>
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
