import 'server-only';

import db from '../prisma';

const executeWorkflow = async (executionId: string) => {
  const execution = await db.workflowExecution.findUnique({
    where: {
      id: executionId
    },
    include: {
      workflow: true,
      phases: true
    }
  });

  if (!execution) {
    throw new Error('Execution not found');
  }
};

export default executeWorkflow;
