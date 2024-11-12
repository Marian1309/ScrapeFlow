import { useMutation } from '@tanstack/react-query';
import { useReactFlow } from '@xyflow/react';
import { toast } from 'sonner';

import { updateWorkflow } from '@/actions/workflows';

const useUpdateWorkflow = (workflowId: string) => {
  const { toObject } = useReactFlow();

  const saveMutation = useMutation({
    mutationFn: updateWorkflow,
    onSuccess: () => {
      toast.success('Flow saved successfully', { id: 'save-workflow' });
    },
    onError: () => {
      toast.error('Something went wrong', { id: 'save-workflow' });
    }
  });

  const handleWorkflowSave = () => {
    const workflowDefinition = JSON.stringify(toObject());
    toast.loading('Saving workflow...', { id: 'save-workflow' });
    saveMutation.mutate({ workflowId, definition: workflowDefinition });
  };

  return { isPending: saveMutation.isPending, handleWorkflowSave };
};

export default useUpdateWorkflow;
