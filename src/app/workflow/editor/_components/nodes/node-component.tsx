import { memo } from 'react';

import type { NodeProps } from '@xyflow/react';

import NodeCard from './node-card';

const NodeComponent = memo((props: NodeProps) => {
  return (
    <NodeCard isSelected={!!props.selected} nodeId={props.id}>
      AppNode
    </NodeCard>
  );
});

export default NodeComponent;

NodeComponent.displayName = 'NodeComponent';
