import type { LucideProps } from 'lucide-react';
import { TextIcon } from 'lucide-react';

import { TaskParamType, TaskType } from '@/types/task';

const extractTextFromElementTask = {
  type: TaskType.EXTRACT_TEXT_FROM_ELEMENT,
  label: 'Extract text from element',
  icon: (props: LucideProps) => <TextIcon {...props} />,
  isEntryPoint: false,
  inputs: [
    {
      name: 'HTML',
      type: TaskParamType.STRING,
      required: true,
      variant: 'textarea'
    },
    {
      name: 'Selector',
      type: TaskParamType.STRING,
      required: true
    }
  ],
  outputs: [{ name: 'Extracted text', type: TaskParamType.STRING }]
};

export default extractTextFromElementTask;
