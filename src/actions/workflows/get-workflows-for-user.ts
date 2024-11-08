'use server';

import { auth } from '@clerk/nextjs/server';

import prisma from '@/db';

const GetWorkflowsForUser = async () => {
  const { userId } = await auth();

  if (!userId) {
    return new Error('Unauthorized');
  }

  return prisma.workflow.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
};

export default GetWorkflowsForUser;
