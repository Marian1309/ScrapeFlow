import type { LucideProps } from 'lucide-react';
import { CodeIcon } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import type { WorkflowTask } from '@/types/workflow';

const pageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get HTML from URL',
  icon: (props: LucideProps) => <CodeIcon {...props} />,
  isEntryPoint: false,
  credits: 5,
  inputs: [
    {
      name: 'Web Page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    }
  ],
  outputs: [
    { name: 'HTML', type: TaskParamType.STRING },
    { name: 'Web Page', type: TaskParamType.BROWSER_INSTANCE }
  ]
} satisfies WorkflowTask;

export default pageToHtmlTask;
