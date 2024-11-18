import type { ExecutionEnvironment } from '@/types/executor';
import { TaskType } from '@/types/task';
import type { WorkflowTask } from '@/types/workflow';

import extractTextFromElementExecutor from './extract-text-from-element';
import launchBrowserExecutor from './launch-browser-executor';
import pageToHTMLExecutor from './page-to-html-executor';

type ExecutorFn<T extends WorkflowTask> = (
  environment: ExecutionEnvironment<T>
) => Promise<boolean>;

type ExecutorRegistry = {
  [key in TaskType]: ExecutorFn<WorkflowTask & { type: key }>;
};

const ExecutorRegistry: ExecutorRegistry = {
  [TaskType.LAUNCH_BROWSER]: launchBrowserExecutor,
  [TaskType.PAGE_TO_HTML]: pageToHTMLExecutor,
  [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: extractTextFromElementExecutor
};

export default ExecutorRegistry;
