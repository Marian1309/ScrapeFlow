import type { FC } from 'react';

import type { Workflow } from '@prisma/client';
import { AlertCircle, InboxIcon } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

import { getWorkflowsForUser } from '@/actions/workflows';

import CreateWorkflowDialog from './create-workflow-dialog';
import WorkflowCard from './workflow-card';

type Props = { userId: string };

const UserWorkflows: FC<Props> = async ({ userId }) => {
  if (!userId) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          If you are logged in, please try refreshing the page.
        </AlertDescription>
      </Alert>
    );
  }

  const workflows: Workflow[] | Error = await getWorkflowsForUser();

  if (workflows instanceof Error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something went wrong. Please try again later.</AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="h-full flex-col gap-4 flex-center">
        <div className="h-20 w-20 rounded-full bg-accent flex-center">
          <InboxIcon className="stroke-primary" size={40} />
        </div>

        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflows created yet.</p>
          <p className="text-muted-foreground">
            Click the button below to create your first workflow.
          </p>
        </div>

        <CreateWorkflowDialog triggerText="Create your first workflow" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {workflows.map((workflow) => (
        <WorkflowCard key={workflow.id} workflow={workflow} />
      ))}
    </div>
  );
};

export default UserWorkflows;
