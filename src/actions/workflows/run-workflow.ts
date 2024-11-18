'use server';

import { auth } from '@clerk/nextjs/server';

import db from '@/lib/prisma';
import flowToExecutionPlan from '@/lib/workflow/execution-plan';

const runWorkflow = async (form: { workflowId: string; flowDefinition?: string }) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const { workflowId, flowDefinition } = form;

  if (!workflowId) {
    throw new Error('Workflow ID is required');
  }

  const workflow = await db.workflow.findUnique({
    where: {
      userId,
      id: workflowId
    }
  });

  if (!workflow) {
    throw new Error('Workflow not found');
  }

  if (!flowDefinition) {
    throw new Error('Flow definition is required');
  }

  const flow = JSON.parse(flowDefinition);

  const result = flowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    throw new Error('Invalid flow definition');
  }

  if (!result.executionPlan) {
    throw new Error('Execution plan not found');
  }

  const executionPlan = result.executionPlan;
};

export default runWorkflow;
