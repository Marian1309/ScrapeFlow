'use server';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import { WorkflowStatus } from '@/types/workflow';

import db from '@/db';

import waitFor from '@/lib/helper/wait-for';

import type { CreateWorkflowSchema } from '@/schema/workflow';
import { createWorkflowSchema } from '@/schema/workflow';

const createWorkflow = async (form: CreateWorkflowSchema) => {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    return new Error('Invalid form data');
  }

  const { userId } = await auth();

  if (!userId) {
    return new Error('Unauthorized');
  }

  await waitFor(1000); // REMOVE

  const createdWorkflow = await db.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: 'TODO',
      ...data
    }
  });

  if (!createdWorkflow) {
    return new Error('Failed to create workflow');
  }

  redirect(`/workflows/editor/${createdWorkflow.id}`);
};

export default createWorkflow;
