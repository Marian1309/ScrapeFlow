'use server';

import { auth } from '@clerk/nextjs/server';

import db from '@/lib/prisma';

const getAvailableCredits = async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error('Unauthorized');
  }

  const userBalance = await db.userBalance.findUnique({
    where: { userId }
  });

  if (!userBalance) {
    return -1;
  }

  return userBalance.credits;
};

export default getAvailableCredits;
