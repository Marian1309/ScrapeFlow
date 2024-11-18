'use server';

import { auth } from '@clerk/nextjs/server';

import db from '@/lib/prisma';

const getWorkflowExecutionWithPhases = async (executionId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const workflowExecution = await db.workflowExecution.findUnique({
    where: { id: executionId, userId },
    include: {
      phases: {
        orderBy: {
          number: 'asc'
        }
      }
    }
  });

  return workflowExecution;
};

export default getWorkflowExecutionWithPhases;
