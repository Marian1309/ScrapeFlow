import { PrismaClient } from '@prisma/client';

import env from '@/env';

const prismaClientSkeleton = () => {
  return new PrismaClient();
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSkeleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSkeleton();

if (env.NODE_ENV !== 'development') {
  globalThis.prismaGlobal = prisma;
}

export default prisma;
