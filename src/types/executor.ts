import type { Browser, Page } from 'puppeteer';

import type { LogCollector } from './log';
import type { WorkflowTask } from './workflow';

export type Environment = {
  browser?: Browser;
  page?: Page;
  phases: {
    [key: string]: {
      inputs: Record<string, string>;
      outputs: Record<string, string>;
    };
  };
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput: (name: T['inputs'][number]['name']) => string;
  setOutput: (name: T['outputs'][number]['name'], value: string) => void;

  getBrowser: () => Browser | undefined;
  setBrowser: (browser: Browser) => void;

  getPage: () => Page | undefined;
  setPage: (page: Page) => void;
  log: LogCollector;
};
