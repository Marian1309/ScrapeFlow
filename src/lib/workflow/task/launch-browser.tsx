import type { LucideProps } from 'lucide-react';
import { GlobeIcon } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import type { WorkflowTask } from '@/types/workflow';

const launchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch Browser',
  icon: (props: LucideProps) => <GlobeIcon {...props} />,
  isEntryPoint: true,
  credits: 5,
  inputs: [
    {
      name: 'Website URL',
      type: TaskParamType.STRING,
      required: true,
      helperText: 'eg: https://www.google.com',
      hideHandle: true
    }
  ] as const,
  outputs: [{ name: 'Web Page', type: TaskParamType.BROWSER_INSTANCE }]
} satisfies WorkflowTask;

export default launchBrowserTask;
