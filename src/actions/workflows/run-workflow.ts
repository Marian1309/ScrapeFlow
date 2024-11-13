'use server';

import { auth } from '@clerk/nextjs/server';

import db from '@/lib/prisma';
import flowToExecutionPlan from '@/lib/workflow/execution-plan';

const runWorkflow = async (form: { workflowId: string; flowDefinition?: string }) => {
  const { userId } = await auth();

  if (!userId) {
    return new Error('Unauthorized');
  }

  const { workflowId, flowDefinition } = form;

  if (!workflowId) {
    return new Error('Workflow ID is required');
  }

  const workflow = await db.workflow.findUnique({
    where: {
      userId,
      id: workflowId
    }
  });

  if (!workflow) {
    return new Error('Workflow not found');
  }

  if (!flowDefinition) {
    throw new Error('Flow definition is required');
  }

  const flow = JSON.parse(flowDefinition);

  const result = flowToExecutionPlan(flow.nodes, flow.edges);

  if (result.error) {
    return new Error('Invalid flow definition');
  }

  if (!result.executionPlan) {
    return new Error('Execution plan not found');
  }

  const executionPlan = result.executionPlan;
  console.log(executionPlan);
};

export default runWorkflow;
