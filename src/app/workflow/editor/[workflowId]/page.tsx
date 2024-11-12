import type { FC } from 'react';

import { notFound, redirect } from 'next/navigation';

import { auth } from '@clerk/nextjs/server';

import db from '@/db';

import Editor from '../_components/editor';

type Props = {
  params: {
    workflowId: string;
  };
};

const WorkflowEditorPage: FC<Props> = async ({ params }) => {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const workflow = await db.workflow.findUnique({
    where: {
      id: params.workflowId,
      userId
    }
  });

  if (!workflow) {
    notFound();
  }

  return <Editor workflow={workflow} />;
};

export default WorkflowEditorPage;
