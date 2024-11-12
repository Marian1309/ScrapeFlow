import type { Node } from '@xyflow/react';

import type { TaskType } from './task';

export type AppNode = Node & {
  data: AppNodeData;
};

export type AppNodeData = {
  type: TaskType;
  inputs: Record<string, string>;

  [key: string]: any;
};
