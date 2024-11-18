import { intervalToDuration } from 'date-fns';

export const datesToDurationString = (
  startedAt: Date | string,
  finishedAt: Date | string
) => {
  if (!startedAt || !finishedAt) return null;

  const timeElapsed = new Date(finishedAt).getTime() - new Date(startedAt).getTime();

  if (timeElapsed < 1000) {
    return `${timeElapsed}ms`;
  }

  const duration = intervalToDuration({
    start: 0,
    end: timeElapsed
  });

  return `${duration.minutes || 0}m ${duration.seconds || 0}s`;
};
