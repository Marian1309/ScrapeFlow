import { PrismaClient } from '@prisma/client';

import env from '@/env';

declare global {
  var prisma: PrismaClient | undefined;
}
const db = global.prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
  global.prisma = db;
}

export default db;
