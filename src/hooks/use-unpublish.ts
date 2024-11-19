import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { unpublishWorkflow } from '@/actions/workflows';

const useUnpublish = ({ workflowId }: { workflowId: string }) => {
  const unpublishWorkflowMutation = useMutation({
    mutationFn: unpublishWorkflow,
    onSuccess: () => {
      toast.success('Execution unpublished', { id: 'flow-unpublishing' });
    },
    onError: () => {
      toast.error('Failed to start unpublishing', { id: 'flow-unpublishing' });
    }
  });

  const handleClick = () => {
    toast.loading('Unpublishing workflow...', { id: 'flow-unpublishing' });

    unpublishWorkflowMutation.mutate({
      workflowId
    });
  };

  return { handleClick, isPending: unpublishWorkflowMutation.isPending };
};

export default useUnpublish;
