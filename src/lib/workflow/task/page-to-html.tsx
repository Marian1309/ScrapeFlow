import type { LucideProps } from 'lucide-react';
import { CodeIcon } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';
import type { WorkflowTask } from '@/types/workflow';

const pageToHtmlTask = {
  type: TaskType.PAGE_TO_HTML,
  label: 'Get HTML from URL',
  icon: (props: LucideProps) => <CodeIcon {...props} />,
  isEntryPoint: false,
  credits: 2,
  inputs: [
    {
      name: 'Web Page',
      type: TaskParamType.BROWSER_INSTANCE,
      required: true
    }
  ] as const,
  outputs: [
    { name: 'HTML', type: TaskParamType.STRING },
    { name: 'Web Page', type: TaskParamType.BROWSER_INSTANCE }
  ] as const
} satisfies WorkflowTask;

export default pageToHtmlTask;
