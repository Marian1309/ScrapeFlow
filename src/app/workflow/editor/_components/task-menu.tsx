'use client';

import { TaskType } from '@/types/task';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

import TaskMenuBtn from './task-menu-btn';

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

export default TaskMenu;
