import { Suspense } from 'react';

import type { NextPage } from 'next';

import { auth } from '@clerk/nextjs/server';

import {
  CreateWorkflowDialog,
  UserWorkflows,
  UserWorkflowsSkeleton
} from './_components';

const WorkflowsPage: NextPage = async () => {
  const { userId } = await auth();

  return (
    <div className="flex h-full flex-1 flex-col px-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>

        <CreateWorkflowDialog />
      </div>

      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowsSkeleton />}>
          <UserWorkflows userId={userId as string} />
        </Suspense>
      </div>
    </div>
  );
};
export default WorkflowsPage;
