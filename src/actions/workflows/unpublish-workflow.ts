'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@clerk/nextjs/server';

import { WorkflowStatus } from '@/types/workflow';

import db from '@/lib/prisma';

const unpublishWorkflow = async ({ workflowId }: { workflowId: string }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id: workflowId,
      userId
    }
  });

  if (!workflow) {
    throw new Error('Workflow not found');
  }

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error('Workflow is not published');
  }

  await db.workflow.update({
    where: { id: workflowId, userId },
    data: { status: WorkflowStatus.DRAFT, executionPlan: null, creditsCost: 0 }
  });

  revalidatePath(`/workflow/editor/${workflowId}`);
};

export default unpublishWorkflow;
