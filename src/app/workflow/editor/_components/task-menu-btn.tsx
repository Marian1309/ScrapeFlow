import type { DragEvent, FC } from 'react';

import type { TaskType } from '@/types/task';

import { TaskRegistry } from '@/lib/workflow/task/registry';

import { Button } from '@/components/ui/button';

type Props = {
  taskType: TaskType;
};

const TaskMenuBtn: FC<Props> = ({ taskType }) => {
  const task = TaskRegistry[taskType];

  const onDragStart = (e: DragEvent<HTMLButtonElement>, type: TaskType) => {
    e.dataTransfer.setData('application/reactflow', type);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <Button
      className="w-full gap-2 border flex-between"
      draggable
      onDragStart={(e) => onDragStart(e, taskType)}
      variant="secondary"
    >
      <div className="flex items-center gap-2">
        <task.icon size={20} />
        {task.label}
      </div>
    </Button>
  );
};

export default TaskMenuBtn;
