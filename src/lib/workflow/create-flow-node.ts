import type { AppNode } from '@/types/app-node';
import type { TaskType } from '@/types/task';

const createFlowNode = (
  nodeType: TaskType,
  position?: { x: number; y: number }
): AppNode => {
  return {
    id: crypto.randomUUID(),
    type: 'FlowScrapeNode',
    position: position ?? { x: 0, y: 0 },
    data: {
      type: nodeType,
      inputs: {}
    }
  };
};

export default createFlowNode;
