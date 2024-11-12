import type { FC } from 'react';

import { Handle, Position, useEdges } from '@xyflow/react';

import type { TaskParam } from '@/types/task';

import { cn } from '@/lib/utils';

import COLOR_FOR_HANDLE from './common';
import NodeParamField from './node-param-field';

type Props = {
  nodeId: string;
  param: TaskParam;
};

const NodeInput: FC<Props> = ({ nodeId, param }) => {
  const edges = useEdges();

  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === param.name
  );

  return (
    <div className="relative flex w-full justify-start bg-secondary p-3">
      <NodeParamField disabled={isConnected} nodeId={nodeId} param={param} />

      {!param.hideHandle && (
        <Handle
          className={cn(
            '!-left-2 !h-4 !w-4 !border-2 !border-background',
            COLOR_FOR_HANDLE[param.type]
          )}
          id={param.name}
          position={Position.Left}
          type="target"
        />
      )}
    </div>
  );
};

export default NodeInput;
