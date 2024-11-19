import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';

import { publishWorkflow } from '@/actions/workflows';

import useExecutionPlan from './use-execution-plan';

const usePublish = ({ workflowId }: { workflowId: string }) => {
  const generate = useExecutionPlan();
  const { toObject } = useReactFlow();

  const publishWorkflowMutation = useMutation({
    mutationFn: publishWorkflow,
    onSuccess: () => {
      toast.success('Execution published', { id: 'flow-publishing' });
    },
    onError: () => {
      toast.error('Failed to start publishing', { id: 'flow-publishing' });
    }
  });

  const handleClick = () => {
    const plan = generate();

    if (!plan) {
      return;
    }

    toast.loading('Publishing workflow...', { id: 'flow-publishing' });

    publishWorkflowMutation.mutate({
      workflowId,
      flowDefinition: JSON.stringify(toObject())
    });
  };

  return { handleClick, isPending: publishWorkflowMutation.isPending };
};

export default usePublish;
