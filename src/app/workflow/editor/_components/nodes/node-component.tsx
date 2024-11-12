import { memo } from 'react';

import type { NodeProps } from '@xyflow/react';

import type { AppNodeData } from '@/types/app-node';
import type { TaskParam } from '@/types/task';

import { TaskRegistry } from '@/lib/workflow/task/registry';

import NodeCard from './node-card';
import NodeHeader from './node-header';
import NodeInput from './node-input';

const NodeComponent = memo((props: NodeProps) => {
  const nodeData = props.data as AppNodeData;
  const task = TaskRegistry[nodeData.type];

  return (
    <NodeCard isSelected={!!props.selected} nodeId={props.id}>
      <NodeHeader taskType={nodeData.type} />

      <div className="flex flex-col gap-2 divide-cyan-50">
        {task.inputs.map((input) => (
          <NodeInput key={input.name} nodeId={props.id} param={input as TaskParam} />
        ))}
      </div>
    </NodeCard>
  );
});

export default NodeComponent;

NodeComponent.displayName = 'NodeComponent';
