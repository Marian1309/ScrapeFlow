'use server';

import { redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import type { WorkflowExecutionPlan } from '@/types/workflow';
import {
  ExecutionPhaseStatus,
  WorkflowExecutionStatus,
  WorkflowExecutionTrigger,
  WorkflowStatus
} from '@/types/workflow';

import db from '@/lib/prisma';
import executeWorkflow from '@/lib/workflow/execute-workflow';
import flowToExecutionPlan from '@/lib/workflow/execution-plan';
import { TaskRegistry } from '@/lib/workflow/task/registry';

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

  let executionPlan: WorkflowExecutionPlan;

  let workflowDefinition = flowDefinition;

  if (workflow.status === WorkflowStatus.PUBLISHED) {
    if (!workflow.executionPlan) {
      throw new Error('Execution plan not found');
    }
    executionPlan = JSON.parse(workflow.executionPlan!);
    workflowDefinition = workflow.definition;
  } else {
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

    executionPlan = result.executionPlan;
  }

  const execution = await db.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      trigger: WorkflowExecutionTrigger.MANUAL,
      startedAt: new Date(),
      definition: workflowDefinition,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => ({
            userId,
            status: ExecutionPhaseStatus.CREATED,
            number: phase.phase,
            node: JSON.stringify(node),
            name: TaskRegistry[node.data.type].label
          }));
        })
      }
    },
    select: {
      id: true,
      phases: true
    }
  });

  if (!execution) {
    throw new Error('Workflow execution not created');
  }

  executeWorkflow(execution.id);

  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
};

export default runWorkflow;
