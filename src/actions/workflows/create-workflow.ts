'use server';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import { WorkflowStatus } from '@/types/workflow';

import prisma from '@/db';

import { waitFor } from '@/lib/helper';

import type { CreateWorkflowSchema } from '@/schema/workflow';
import { createWorkflowSchema } from '@/schema/workflow';

export const createWorkflow = async (form: CreateWorkflowSchema) => {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    return new Error('Invalid form data');
  }

  const { userId } = await auth();

  if (!userId) {
    return new Error('Unauthorized');
  }

  await waitFor(1000); // REMOVE

  const result = await prisma.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: 'TODO',
      ...data
    }
  });

  if (!result) {
    return new Error('Failed to create workflow');
  }

  redirect(`/workflows/editor/${result.id}`);
};
