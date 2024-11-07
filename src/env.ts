import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    NODE_ENV: z.enum(['development', 'production']),
    DATABASE_URL: z.string().url()
  },
  client: {},
  // eslint-disable-next-line n/no-process-env
  experimental__runtimeEnv: process.env,
  emptyStringAsUndefined: true
});

export default env;
