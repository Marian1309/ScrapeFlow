'use client';

import type { FC } from 'react';

import { PlayIcon } from 'lucide-react';

import useExecute from '@/hooks/use-execute';

import { Button } from '@/components/ui/button';

type Props = {
  workflowId: string;
};

const ExecuteBtn: FC<Props> = ({ workflowId }) => {
  const { handleClick, isPending } = useExecute({ workflowId });

  return (
    <Button
      className="flex items-center gap-2"
      disabled={isPending}
      onClick={handleClick}
      variant="outline"
    >
      <PlayIcon className="stroke-orange-600" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
