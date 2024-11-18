import {
  type Log,
  type LogCollector,
  type LogFunction,
  type LogLevel,
  LogLevels
} from '@/types/log';

const createLogCollector = (): LogCollector => {
  const logs: Log[] = [];

  const logFunctions = {} as Record<LogLevel, LogFunction>;

  LogLevels.forEach((level) => {
    logFunctions[level] = (message: string) => {
      logs.push({ message, level, timestamp: new Date() });
    };
  });

  return {
    getAll: () => logs,
    ...logFunctions
  };
};

export default createLogCollector;
