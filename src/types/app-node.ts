import type { Node } from '@xyflow/react';

import type { TaskType } from './task';

export type AppNode = Node & {
  data: AppNodeData;
};

export type AppNodeData = {
  type: TaskType;
  inputs: Record<string, string>;
  name: string;

  [key: string]: any;
};

export type AppNodeMissingInputs = {
  nodeId: string;
  inputs: string[];
};
