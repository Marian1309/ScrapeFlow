import type { ExecutionPhase } from '@prisma/client';

type Phase = Pick<ExecutionPhase, 'creditsConsumed'>;

const getPhasesTotalCost = (phases: Phase[]) => {
  return phases.reduce((acc, phase) => acc + (phase.creditsConsumed || 0), 0);
};

export default getPhasesTotalCost;
