import { revalidatePath } from 'next/cache';

import type { ExecutionPhase } from '@prisma/client';
import 'server-only';

import type { AppNode } from '@/types/app-node';
import type { Environment, ExecutionEnvironment } from '@/types/executor';
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from '@/types/workflow';

import waitFor from '../helper/wait-for';
import db from '../prisma';

import ExecutorRegistry from './executor/registry';
import { TaskRegistry } from './task/registry';

const executeWorkflow = async (executionId: string) => {
  const execution = await db.workflowExecution.findUnique({
    where: {
      id: executionId
    },
    include: {
      workflow: true,
      phases: true
    }
  });

  if (!execution) {
    throw new Error('Execution not found');
  }

  const environment = { phases: {} };

  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializePhaseStatuses(executionId);

  let executionFailed = false;
  const creditsConsumed = 0;

  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(phase, environment);

    if (!phaseExecution.success) {
      executionFailed = true;
      break;
    }
  }

  await finalizeWorkflowExecution(
    executionId,
    execution.workflowId,
    executionFailed,
    creditsConsumed
  );

  revalidatePath('/workflows/runs');
};

export default executeWorkflow;

const initializeWorkflowExecution = async (executionId: string, workflowId: string) => {
  await db.workflowExecution.update({
    where: { id: executionId },
    data: {
      startedAt: new Date(),
      status: WorkflowExecutionStatus.RUNNING
    }
  });

  await db.workflow.update({
    where: { id: workflowId },
    data: {
      lastRunAt: new Date(),
      lastRunId: executionId,
      lastRunStatus: WorkflowExecutionStatus.RUNNING
    }
  });
};

const initializePhaseStatuses = async (execution: any) => {
  await db.executionPhase.updateMany({
    where: {
      id: {
        in: execution.phases?.map((phase: any) => phase.id)
      }
    },
    data: {
      status: ExecutionPhaseStatus.PENDING
    }
  });
};

const finalizeWorkflowExecution = async (
  executionId: string,
  workflowId: string,
  executionFailed: boolean,
  creditsConsumed: number
) => {
  const finalStatus = executionFailed
    ? WorkflowExecutionStatus.FAILED
    : WorkflowExecutionStatus.COMPLETED;

  await db.workflowExecution.update({
    where: { id: executionId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      creditsConsumed
    }
  });

  await db.workflow
    .update({
      where: { id: workflowId, lastRunId: executionId },
      data: {
        lastRunStatus: finalStatus
      }
    })
    .catch(() => {});
};

const executeWorkflowPhase = async (phase: ExecutionPhase, environment: Environment) => {
  const startedAt = new Date();

  const node = JSON.parse(phase.node) as AppNode;

  setupEnvironmentForPhases(node, environment);

  await db.executionPhase.update({
    where: { id: phase.id },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt
    }
  });

  const creditsRequired = TaskRegistry[node.data.type].credits || 0;

  await waitFor(2000);

  const success = await executePhase(phase, node, environment);

  await finalizePhase(phase.id, success);

  return { success };
};

const finalizePhase = async (phaseId: string, success: boolean) => {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  await db.executionPhase.update({
    where: { id: phaseId },
    data: { status: finalStatus, completedAt: new Date() }
  });
};

const executePhase = async (
  phase: ExecutionPhase,
  node: AppNode,
  environment: Environment
): Promise<any> => {
  const runFn = ExecutorRegistry[node.data.type];

  if (!runFn) {
    throw new Error(`No executor found for task type: ${node.data.type}`);
  }

  const executionEnvironment: ExecutionEnvironment<any> = createExecutionEnvironment(
    node,
    environment
  );

  return await runFn(executionEnvironment);
};

const setupEnvironmentForPhases = (node: AppNode, environment: Environment) => {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {}
  };

  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    const inputValue = node.data.inputs[input.name];

    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    environment.phases[node.id].inputs[input.name] = '';
  }
};

const createExecutionEnvironment = (
  node: AppNode,
  environment: Environment
): ExecutionEnvironment => {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name]
  };
};
