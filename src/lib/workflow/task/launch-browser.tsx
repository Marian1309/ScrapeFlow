import type { LucideProps } from 'lucide-react';
import { GlobeIcon } from 'lucide-react';

import { TaskType } from '@/types/task';

export const launchBrowserTask = {
  type: TaskType.LAUNCH_BROWSER,
  label: 'Launch Browser',
  icon: (props: LucideProps) => <GlobeIcon {...props} />,
  isEntryPoint: true,
  inputs: [
    {
      name: 'Website URL',
      type: 'STRING',
      required: true,
      helperText: 'eg: https://www.google.com',
      hideHandle: true
    }
  ]
};
