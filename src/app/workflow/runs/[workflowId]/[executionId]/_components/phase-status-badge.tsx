import type { FC } from 'react';

import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  Loader2Icon
} from 'lucide-react';

import { ExecutionPhaseStatus } from '@/types/workflow';

type Props = { status: ExecutionPhaseStatus };

const PhaseStatusBadge: FC<Props> = ({ status }) => {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashedIcon className="stroke-muted-foreground" size={20} />;
    case ExecutionPhaseStatus.RUNNING:
      return <Loader2Icon className="stroke-yellow-500" size={20} />;
    case ExecutionPhaseStatus.COMPLETED:
      return <CircleCheckIcon className="stroke-green-500" size={20} />;
    case ExecutionPhaseStatus.FAILED:
      return <CircleXIcon className="stroke-destructive" size={20} />;
    default:
      return <div className="rounded-full">{status}</div>;
  }
};

export default PhaseStatusBadge;
