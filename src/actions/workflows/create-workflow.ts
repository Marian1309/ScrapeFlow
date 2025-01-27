'use server';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';
import type { Edge } from '@xyflow/react';

import type { AppNode } from '@/types/app-node';
import { TaskType } from '@/types/task';
import { WorkflowStatus } from '@/types/workflow';

import db from '@/lib/prisma';
import createFlowNode from '@/lib/workflow/create-flow-node';

import type { CreateWorkflowSchema } from '@/schema/workflow';
import { createWorkflowSchema } from '@/schema/workflow';

const createWorkflow = async (form: CreateWorkflowSchema) => {
  const { success, data } = createWorkflowSchema.safeParse(form);

  if (!success) {
    throw new Error('Invalid form data');
  }

  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const existingWorkflow = await db.workflow.findFirst({
    where: {
      userId,
      name: data.name
    }
  });

  if (existingWorkflow) {
    throw new Error('Workflow with this name already exists');
  }

  const initialFlow: { nodes: AppNode[]; edges: Edge[] } = {
    nodes: [],
    edges: []
  };

  initialFlow.nodes.push(createFlowNode(TaskType.LAUNCH_BROWSER));

  const createdWorkflow = await db.workflow.create({
    data: {
      userId,
      status: WorkflowStatus.DRAFT,
      definition: JSON.stringify(initialFlow),
      ...data
    }
  });

  if (!createdWorkflow) {
    throw new Error('Failed to create workflow');
  }

  redirect(`/workflow/editor/${createdWorkflow.id}`);
};

export default createWorkflow;
