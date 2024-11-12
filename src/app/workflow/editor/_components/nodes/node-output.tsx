'use client';

import type { FC } from 'react';

import { Handle, Position } from '@xyflow/react';

import type { TaskParam } from '@/types/task';

import { cn } from '@/lib/utils';

import COLOR_FOR_HANDLE from './common';

type Props = {
  param: TaskParam;
};

const NodeOutput: FC<Props> = ({ param }) => {
  return (
    <div className="relative flex justify-end bg-secondary p-3">
      <p className="text-xs text-muted-foreground">{param.name}</p>
      <Handle
        className={cn(
          '!-right-2 !h-4 !w-4 !border-2 !border-background !bg-muted-foreground',
          COLOR_FOR_HANDLE[param.type]
        )}
        id={param.name}
        position={Position.Right}
        type="source"
      />
    </div>
  );
};

export default NodeOutput;
