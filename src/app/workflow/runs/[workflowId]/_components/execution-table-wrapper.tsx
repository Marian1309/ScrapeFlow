import type { FC } from 'react';

import { InboxIcon } from 'lucide-react';

import { getWorkflowExecutions } from '@/actions/workflows';

import ExecutionTable from './execution-table';

type Props = { workflowId: string };

const ExecutionTableWrapper: FC<Props> = async ({ workflowId }) => {
  const executions = await getWorkflowExecutions(workflowId);

  if (!executions) {
    return <div>No executions found</div>;
  }

  if (executions.length === 0) {
    return (
      <div className="container w-full p-6">
        <div className="h-full w-full flex-col gap-2 gap-y-5 flex-center">
          <div className="h-20 w-20 rounded-full bg-accent flex-center">
            <InboxIcon className="stroke-primary" size={40} />
          </div>

          <div className="flex flex-col gap-1 text-center">
            <p className="font-bold">No runs have been trigered yet for this workflow</p>
            <p className="text-sm text-muted-foreground">
              You can trigger a new run in the editor page.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container w-full p-6">
      <ExecutionTable initialData={executions} workflowId={workflowId} />
    </div>
  );
};

export default ExecutionTableWrapper;
