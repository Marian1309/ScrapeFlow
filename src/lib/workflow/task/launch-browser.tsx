import type { LucideProps } from 'lucide-react';
import { GlobeIcon } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';

const launchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch Browser',
  icon: (props: LucideProps) => <GlobeIcon {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: 'Website URL',
      type: TaskParamType.STRING,
      required: true,
      helperText: 'eg: https://www.google.com',
      hideHandle: true
    }
  ],
  outputs: [{ name: 'Web Page', type: TaskParamType.BROWSER_INSTANCE }]
};

export default launchBrowserTask;
