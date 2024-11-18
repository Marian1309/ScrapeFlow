import type { Browser } from 'puppeteer';

import type { WorkflowTask } from './workflow';

export type Environment = {
  browser?: Browser;
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput: (name: T['inputs'][number]['name']) => string;
};
