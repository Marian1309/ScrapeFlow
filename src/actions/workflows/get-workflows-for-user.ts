'use server';

import { auth } from '@clerk/nextjs/server';

import db from '@/db';

const getWorkflowsForUser = async () => {
  try {
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

    return userWorkflows;
  } catch (error: unknown) {
    return error instanceof Error ? error : new Error('Unknown error occurred');
  }
};

export default getWorkflowsForUser;
