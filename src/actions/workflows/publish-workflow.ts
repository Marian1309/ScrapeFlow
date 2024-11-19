'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@clerk/nextjs/server';

import { WorkflowStatus } from '@/types/workflow';

import db from '@/lib/prisma';
import flowToExecutionPlan from '@/lib/workflow/execution-plan';
import { calculateWorkflowCost } from '@/lib/workflow/helpers';

const publishWorkflow = async ({
  workflowId,
  flowDefinition
}: {
  workflowId: string;
  flowDefinition: string;
}) => {
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

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error('Workflow is not in draft state');
  }

  const flow = JSON.parse(flowDefinition);

  const result = flowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error('Flow is not valid');
  }

  if (!result.executionPlan) {
    throw new Error('No execution plan generated');
  }

  const creditsCost = calculateWorkflowCost(flow.nodes);

  await db.workflow.update({
    where: { id: workflowId, userId },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED
    }
  });

  revalidatePath(`/workflow/editor/${workflowId}`);
};

export default publishWorkflow;
