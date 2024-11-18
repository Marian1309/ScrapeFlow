import type { FC } from 'react';

import type { ExecutionLog } from '@prisma/client';

import type { LogLevel } from '@/types/log';

import { cn } from '@/lib/utils';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';

type Props = {
  logs: ExecutionLog[];
};

const LogViewer: FC<Props> = ({ logs }) => {
  if (!logs || logs.length === 0) return null;

  return (
    <Card className="w-full">
      <CardHeader className="rounded-lg rounded-b-none border-b py-4 bg-gray-50 dark:bg-background">
        <CardTitle className="text-base">Logs</CardTitle>

        <CardDescription className="text-muted-foreground text-sm">
          Logs generated by this phase
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader className="text-muted-foreground text-sm">
            <TableRow>
              <TableHead className="p-0">Time</TableHead>
              <TableHead>Level</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {logs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="text-sm text-muted-foreground p-0" width={190}>
                  {log.timeStamp.toLocaleString()}
                </TableCell>
                <TableCell
                  className={cn(
                    'uppercase text-xs font-bold',
                    (log.logLevel as LogLevel) === 'error' && 'text-destructive',
                    (log.logLevel as LogLevel) === 'info' && 'text-primary'
                  )}
                  width={80}
                >
                  {log.logLevel.toLocaleString()}
                </TableCell>
                <TableCell>{log.message.toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LogViewer;
