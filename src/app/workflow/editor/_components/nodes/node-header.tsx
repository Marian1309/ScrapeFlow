'use client';

import type { FC } from 'react';

import { useReactFlow } from '@xyflow/react';
import { CoinsIcon, CopyIcon, GripVerticalIcon, TrashIcon } from 'lucide-react';

import type { AppNode } from '@/types/app-node';
import type { TaskType } from '@/types/task';

import createFlowNode from '@/lib/workflow/create-flow-node';
import { TaskRegistry } from '@/lib/workflow/task/registry';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Props = {
  nodeId: string;
  taskType: TaskType;
};

const NodeHeader: FC<Props> = ({ nodeId, taskType }) => {
  const { icon: Icon, label, isEntryPoint, credits } = TaskRegistry[taskType];

  const { deleteElements, getNode, addNodes } = useReactFlow();

  const handlNodeCopy = () => {
    const node = getNode(nodeId) as AppNode;

    const newX = node.position.x;
    const newY = node.position.y + node.measured?.height! + 20;

    const newNode = createFlowNode(node.data.type, { x: newX, y: newY });

    addNodes([newNode]);
  };

  return (
    <div className="flex items-center gap-2 p-2">
      <Icon size={16} />

      <div className="w-full flex-between">
        <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>

        <div className="flex items-center gap-1">
          {isEntryPoint && <Badge>Entry Point</Badge>}

          <Badge className="flex items-center gap-2 text-xs">
            <CoinsIcon size={16} />
            {credits}
          </Badge>

          {!isEntryPoint && (
            <>
              <Button
                onClick={() => deleteElements({ nodes: [{ id: nodeId }] })}
                size="icon"
                variant="ghost"
              >
                <TrashIcon size={12} />
              </Button>

              <Button onClick={handlNodeCopy} size="icon" variant="ghost">
                <CopyIcon size={12} />
              </Button>
            </>
          )}

          <Button className="drag-handle cursor-grab" size="icon" variant="ghost">
            <GripVerticalIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
