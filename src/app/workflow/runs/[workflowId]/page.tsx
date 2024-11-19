import type { FC } from 'react';
import { Suspense } from 'react';

import { Loader2Icon } from 'lucide-react';

import { Topbar } from '@/components/blocks';

import { ExecutionTableWrapper } from './_components';

type Props = {
  params: {
    workflowId: string;
  };
};

const ExecutionPage: FC<Props> = ({ params }) => {
  return (
    <div className="w-fell w-full overflow-auto">
      <Topbar
        hideButtons
        subtitle="List of all your workflow runs"
        title="All runs"
        workflowId={params.workflowId}
      />

      <Suspense
        fallback={
          <div className="h-screen w-full flex-center">
            <Loader2Icon className="animate-spin stroke-primary" size={30} />
          </div>
        }
      >
        <ExecutionTableWrapper workflowId={params.workflowId} />
      </Suspense>
    </div>
  );
};

export default ExecutionPage;
