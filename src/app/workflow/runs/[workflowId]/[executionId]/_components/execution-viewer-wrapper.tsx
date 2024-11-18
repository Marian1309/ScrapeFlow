import type { FC } from 'react';

import { getWorkflowExecutionWithPhases } from '@/actions/workflows';

import ExecutionViewer from './execution-viewer';

type Props = { executionId: string };

const ExecutionViewerWrapper: FC<Props> = async ({ executionId }) => {
  const workflowExecution = await getWorkflowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    return <div>Workflow execution not found</div>;
  }

  return <ExecutionViewer initialData={workflowExecution} />;
};

export default ExecutionViewerWrapper;
