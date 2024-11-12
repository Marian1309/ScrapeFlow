import type { TaskType } from './task';
import type { WorkflowTask } from './workflow';

export type Registry = {
  [K in TaskType]: WorkflowTask & { type: K };
};
