'use client';

import type { DragEvent, FC } from 'react';

import { TaskType } from '@/types/task';

import { TaskRegistry } from '@/lib/workflow/task/registry';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

const TaskMenu = () => {
  return (
    <aside className="h-full w-[340px] min-w-[340px] max-w-[340px] border-separate overflow-auto border-r-2 p-2 px-4">
      <Accordion className="w-full" defaultValue={['data-extraction']} type="multiple">
        <AccordionItem value="data-extraction">
          <AccordionTrigger>Data Extraction</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <TaskMenuBtn taskType={TaskType.PAGE_TO_HTML} />
            <TaskMenuBtn taskType={TaskType.EXTRACT_TEXT_FROM_ELEMENT} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  );
};

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

export default TaskMenu;
