'use client';

import type { FC, ReactNode } from 'react';

import { cn } from '@/lib/utils';

import useNodeCentering from '@/hooks/use-node-centering';

type Props = {
  children: ReactNode;
  nodeId: string;
  isSelected: boolean;
};

const NodeCard: FC<Props> = ({ children, nodeId, isSelected }) => {
  const handleNodeCenter = useNodeCentering(nodeId);

  return (
    <div
      className={cn(
        'flex w-[420px] border-separate cursor-pointer flex-col gap-1 rounded-md border-2 bg-background text-xs',
        isSelected && 'border-primary'
      )}
      onDoubleClick={handleNodeCenter}
    >
      {children}
    </div>
  );
};

export default NodeCard;
