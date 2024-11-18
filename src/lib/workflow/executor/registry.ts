import { TaskType } from '@/types/task';

import launchBrowserExecutor from './launch-browser-executor';

const ExecutorRegistry = {
  [TaskType.LAUNCH_BROWSER]: launchBrowserExecutor,
  [TaskType.PAGE_TO_HTML]: () => Promise.resolve(true),
  [TaskType.EXTRACT_TEXT_FROM_ELEMENT]: () => Promise.resolve(true)
};

export default ExecutorRegistry;
