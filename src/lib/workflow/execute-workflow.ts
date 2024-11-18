import { revalidatePath } from 'next/cache';

import type { ExecutionPhase } from '@prisma/client';
import type { Edge } from '@xyflow/react';
import type { Browser, Page } from 'puppeteer';
import 'server-only';

import type { AppNode } from '@/types/app-node';
import type { Environment, ExecutionEnvironment } from '@/types/executor';
import { TaskParamType } from '@/types/task';
import { ExecutionPhaseStatus, WorkflowExecutionStatus } from '@/types/workflow';

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

  const edges = JSON.parse(execution.definition).edges as Edge[];

  const environment = { phases: {} };

  await initializeWorkflowExecution(executionId, execution.workflowId);
  await initializePhaseStatuses(executionId);

  let executionFailed = false;
  const creditsConsumed = 0;

  for (const phase of execution.phases) {
    const phaseExecution = await executeWorkflowPhase(phase, environment, edges);

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

  await cleanupEnvironment(environment);

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

const executeWorkflowPhase = async (
  phase: ExecutionPhase,
  environment: Environment,
  edges: Edge[]
) => {
  const startedAt = new Date();

  const node = JSON.parse(phase.node) as AppNode;

  setupEnvironmentForPhases(node, environment, edges);

  await db.executionPhase.update({
    where: { id: phase.id },
    data: {
      status: ExecutionPhaseStatus.RUNNING,
      startedAt,
      inputs: JSON.stringify(environment.phases[node.id].inputs)
    }
  });

  const creditsRequired = TaskRegistry[node.data.type].credits || 0;

  const success = await executePhase(phase, node, environment);

  const outputs = environment.phases[node.id].outputs;

  await finalizePhase(phase.id, success, outputs);

  return { success };
};

const finalizePhase = async (
  phaseId: string,
  success: boolean,
  outputs: Record<string, string>
) => {
  const finalStatus = success
    ? ExecutionPhaseStatus.COMPLETED
    : ExecutionPhaseStatus.FAILED;

  await db.executionPhase.update({
    where: { id: phaseId },
    data: {
      status: finalStatus,
      completedAt: new Date(),
      outputs: JSON.stringify(outputs)
    }
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

const setupEnvironmentForPhases = (
  node: AppNode,
  environment: Environment,
  edges: Edge[]
) => {
  environment.phases[node.id] = {
    inputs: {},
    outputs: {}
  };

  const inputs = TaskRegistry[node.data.type].inputs;

  for (const input of inputs) {
    if (input.type === TaskParamType.BROWSER_INSTANCE) {
      continue;
    }

    const inputValue = node.data.inputs[input.name];

    if (inputValue) {
      environment.phases[node.id].inputs[input.name] = inputValue;
      continue;
    }

    const connectedEdge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle === input.name
    );

    if (!connectedEdge) {
      console.error('No connection found for input', node.id, input.name);
      continue;
    }

    const outputValue =
      environment.phases[connectedEdge.source].outputs[connectedEdge.sourceHandle!];

    environment.phases[node.id].inputs[input.name] = outputValue;
  }
};

const createExecutionEnvironment = (
  node: AppNode,
  environment: Environment
): ExecutionEnvironment<any> => {
  return {
    getInput: (name: string) => environment.phases[node.id]?.inputs[name],
    setOutput: (name: string, value: string) => {
      environment.phases[node.id].outputs[name] = value;
    },
    getBrowser: () => environment.browser,
    setBrowser: (browser: Browser) => {
      environment.browser = browser;
    },
    getPage: (): Page | undefined => environment.page,
    setPage: (page: Page): void => {
      environment.page = page;
    }
  };
};

const cleanupEnvironment = async (environment: Environment) => {
  if (environment.browser) {
    await environment.browser
      .close()
      .catch((err) => console.error(`Cannot close browser: `, err));
  }
};
