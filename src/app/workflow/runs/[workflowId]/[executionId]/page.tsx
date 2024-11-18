import { Suspense } from 'react';

import { Loader2Icon } from 'lucide-react';

import { Topbar } from '@/components/blocks';

import { ExecutionViewerWrapper } from './_components';

type Props = {
  params: {
    workflowId: string;
    executionId: string;
  };
};

const WorkflowExecutionPage = ({ params }: Props) => {
  const fallback = (
    <div className="flex-center w-full">
      <Loader2Icon className="h-10 w-10 animate-spin stroke-primary" />
    </div>
  );

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      <Topbar
        hideButtons
        subtitle={`Run ID: ${params.executionId}`}
        title="Workflow run details"
        workflowId={params.workflowId}
      />

      <section className="flex h-full overflow-auto">
        <Suspense fallback={fallback}>
          <ExecutionViewerWrapper executionId={params.executionId} />
        </Suspense>
      </section>
    </div>
  );
};

export default WorkflowExecutionPage;
