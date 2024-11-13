'use client';

import type { FC } from 'react';

import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

import useExecutionPlan from '@/hooks/use-execution-plan';

import { Button } from '@/components/ui/button';

import { runWorkflow } from '@/actions/workflows';

type Props = {
  workflowId: string;
};

const ExecuteBtn: FC<Props> = ({ workflowId }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const runWorkflowMutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success('Execution started', { id: 'flow-execution' });
    },
    onError: () => {
      toast.error('Failed to start execution', { id: 'flow-execution' });
    }
  });

  return (
    <Button
      className="flex items-center gap-2"
      disabled={runWorkflowMutation.isPending}
      onClick={() => {
        const plan = generate();

        if (!plan) {
          return;
        }

        runWorkflowMutation.mutate({
          workflowId,
          flowDefinition: JSON.stringify(toObject())
        });
      }}
      variant="outline"
    >
      <PlayIcon className="stroke-orange-600" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
