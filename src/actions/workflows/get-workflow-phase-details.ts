'use server';

import { auth } from '@clerk/nextjs/server';

import db from '@/lib/prisma';

const getWorkflowPhaseDetails = async (phaseId: string) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const phase = await db.executionPhase.findUnique({
    where: {
      id: phaseId,
      workflowExecution: {
        userId
      }
    }
  });

  return phase;
};

export default getWorkflowPhaseDetails;
