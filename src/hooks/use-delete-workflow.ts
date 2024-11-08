import type { KeyboardEvent, MouseEvent } from 'react';
import { useState } from 'react';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deleteWorkflow } from '@/actions/workflows';

const useDeleteWorkflow = ({ workflowId }: { workflowId: string }) => {
  const [textConfirm, setTextConfirm] = useState<string>('');

  const deleteMutation = useMutation({
    mutationFn: deleteWorkflow,
    onSuccess: () => {
      toast.success('Workflow deleted successfully', { id: workflowId });
      setTextConfirm('');
    },
    onError: () => {
      toast.error('Failed to delete workflow', { id: workflowId });
    }
  });

  const handleWorkflowDelete = (
    e:
      | MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
      | KeyboardEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    toast.loading('Deleting workflow...', { id: workflowId });
    deleteMutation.mutate(workflowId);
  };

  return { handleWorkflowDelete, textConfirm, setTextConfirm, deleteMutation };
};

export default useDeleteWorkflow;
