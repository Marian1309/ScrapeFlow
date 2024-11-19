import type { AppNode } from '@/types/app-node';

import { TaskRegistry } from './task/registry';

export const calculateWorkflowCost = (nodes: AppNode[]) => {
  return nodes.reduce((acc, node) => acc + TaskRegistry[node.data.type].credits, 0);
};
