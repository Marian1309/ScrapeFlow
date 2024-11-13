'use client';

import type { FC } from 'react';

import { PlayIcon } from 'lucide-react';

import useExecutionPlan from '@/hooks/use-execution-plan';

import { Button } from '@/components/ui/button';

type Props = {
  workflowId: string;
};

const ExecuteBtn: FC<Props> = ({ workflowId }) => {
  const generate = useExecutionPlan();

  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => {
        const plan = generate();
      }}
      variant="outline"
    >
      <PlayIcon className="stroke-orange-600" />
      Execute
    </Button>
  );
};

export default ExecuteBtn;
