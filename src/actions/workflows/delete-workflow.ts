'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@clerk/nextjs/server';

import waitFor from '@/lib/helper/wait-for';
import db from '@/lib/prisma';

const deleteWorkflow = async (workflowId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return new Error('Unauthorized');
  }

  await waitFor(1000);

  await db.workflow.delete({
    where: {
      id: workflowId,
      userId
    }
  });

  revalidatePath('/workflows');
};

export default deleteWorkflow;
