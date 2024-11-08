import { MoreVerticalIcon } from 'lucide-react';
import { TrashIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { TooltipWrapper } from '@/components/blocks';

const WorkflowActions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <TooltipWrapper content="More actions" side="top">
            <div className="h-full w-full flex-center">
              <MoreVerticalIcon size={18} />
            </div>
          </TooltipWrapper>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2 text-destructive">
          <TrashIcon size={16} />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WorkflowActions;
