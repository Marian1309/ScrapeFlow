'use server';

import { revalidatePath } from 'next/cache';

import { auth } from '@clerk/nextjs/server';

import prisma from '@/db';

import { waitFor } from '@/lib/helper';

const deleteWorkflow = async (workflowId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return new Error('Unauthorized');
  }

  await waitFor(1000);

  await prisma.workflow.delete({
    where: {
      id: workflowId,
      userId
    }
  });

  revalidatePath('/workflows');
};

export default deleteWorkflow;
