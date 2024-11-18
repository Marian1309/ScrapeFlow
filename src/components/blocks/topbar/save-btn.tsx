'use client';

import type { FC } from 'react';

import { CheckIcon } from 'lucide-react';

import useUpdateWorkflow from '@/hooks/use-update-workflow';

import { Button } from '@/components/ui/button';

type Props = {
  workflowId: string;
};

const SaveBtn: FC<Props> = ({ workflowId }) => {
  const { handleWorkflowSave, isPending } = useUpdateWorkflow(workflowId);

  return (
    <Button
      className="FLEX items-center gap-2"
      disabled={isPending}
      onClick={handleWorkflowSave}
      variant="outline"
    >
      <CheckIcon className="stroke-green-400" size={16} />
      Save
    </Button>
  );
};

export default SaveBtn;
