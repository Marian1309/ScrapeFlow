'use server';

import { auth } from '@clerk/nextjs/server';

import { WorkflowStatus } from '@/types/workflow';

import waitFor from '@/lib/helper/wait-for';
import db from '@/lib/prisma';

const updateWorkflow = async ({
  workflowId,
  definition
}: {
  workflowId: string;
  definition: string;
}) => {
  const { userId } = await auth();

  if (!userId) {
    return new Error('Unauthorized');
  }

  await waitFor(1000); // REMOVE

  const workflow = await db.workflow.findUnique({
    where: {
      id: workflowId,
      userId
    }
  });

  if (!workflow) {
    return new Error('Workflow not found');
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    return new Error('Workflow is not in draft status');
  }

  const updatedWorkflow = await db.workflow.update({
    where: {
      id: workflowId,
      userId
    },
    data: {
      definition
    }
  });

  return updatedWorkflow;
};

export default updateWorkflow;
