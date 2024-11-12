'use server';

import { auth } from '@clerk/nextjs/server';

import db from '@/db';

const getWorkflowsForUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return new Error('Unauthorized');
  }

  const userWorkflows = await db.workflow.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'asc'
    }
  });

  return userWorkflows ?? [];
};

export default getWorkflowsForUser;
