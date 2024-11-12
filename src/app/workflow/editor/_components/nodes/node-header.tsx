'use client';

import type { FC } from 'react';

import { CoinsIcon, GripVerticalIcon } from 'lucide-react';

import type { TaskType } from '@/types/task';

import { TaskRegistry } from '@/lib/workflow/task/registry';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Props = {
  taskType: TaskType;
};

const NodeHeader: FC<Props> = ({ taskType }) => {
  const { icon: Icon, label, isEntryPoint } = TaskRegistry[taskType];

  return (
    <div className="flex items-center gap-2 p-2">
      <Icon size={16} />

      <div className="w-full flex-between">
        <p className="text-xs font-bold uppercase text-muted-foreground">{label}</p>

        <div className="flex items-center gap-1">
          {isEntryPoint && <Badge>Entry Point</Badge>}

          <Badge className="flex items-center gap-2 text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>

          <Button className="drag-handle cursor-grab" size="icon" variant="ghost">
            <GripVerticalIcon size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NodeHeader;
