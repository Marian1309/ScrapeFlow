'use client';

import type { FC } from 'react';

import { useMutation } from '@tanstack/react-query';
import { PlayIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { runWorkflow } from '@/actions/workflows';

type Props = {
  workflowId: string;
};

const RunBtn: FC<Props> = ({ workflowId }) => {
  const mutation = useMutation({
    mutationFn: runWorkflow,
    onSuccess: () => {
      toast.success('Workflow execution started', { id: workflowId });
    },
    onError: () => {
      toast.error('Failed to start workflow execution', { id: workflowId });
    }
  });

  return (
    <Button
      className="temsce flex gap-2"
      disabled={mutation.isPending}
      onClick={() => {
        toast.loading('Starting workflow execution...', { id: workflowId });
        mutation.mutate({
          workflowId
        });
      }}
      size="sm"
      variant="outline"
    >
      <PlayIcon size={16} />
    </Button>
  );
};

export default RunBtn;
