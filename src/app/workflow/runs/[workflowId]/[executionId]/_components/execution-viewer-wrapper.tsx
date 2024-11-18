import { getWorkflowExecutionWithPhases } from '@/actions/workflows';

import ExecutionViewer from './execution-viewer';

const ExecutionViewerWrapper = async ({ executionId }: { executionId: string }) => {
  const workflowExecution = await getWorkflowExecutionWithPhases(executionId);

  if (!workflowExecution) {
    return <div>Workflow execution not found</div>;
  }

  return <ExecutionViewer initialData={workflowExecution} />;
};

export default ExecutionViewerWrapper;
