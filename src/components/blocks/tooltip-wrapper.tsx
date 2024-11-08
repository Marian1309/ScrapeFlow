import type { FC, ReactNode } from 'react';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

type Props = {
  children: ReactNode;
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

const TooltipWrapper: FC<Props> = ({ children, content, side = 'top' }) => {
  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipWrapper;
