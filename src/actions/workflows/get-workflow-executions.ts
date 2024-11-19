'use server';

import { auth } from '@clerk/nextjs/server';

import db from '@/lib/prisma';

const getWorkflowExecutions = async (workflowId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const workflowExecutions = await db.workflowExecution.findMany({
    where: {
      workflowId,
      userId
    },
    orderBy: {
      completedAt: 'desc'
    }
  });

  return workflowExecutions;
};

export default getWorkflowExecutions;
