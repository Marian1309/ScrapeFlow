import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';

import { runWorkflow } from '@/actions/workflows';

import useExecutionPlan from './use-execution-plan';

const useExecute = ({ workflowId }: { workflowId: string }) => {
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

  const handleClick = () => {
    const plan = generate();

    if (!plan) {
      return;
    }

    runWorkflowMutation.mutate({
      workflowId,
      flowDefinition: JSON.stringify(toObject())
    });
  };

  return { handleClick, isPending: runWorkflowMutation.isPending };
};

export default useExecute;
