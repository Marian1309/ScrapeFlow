import { z } from 'zod';

export const createWorkflowSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(50)
    .trim()
    .regex(
      /^[a-zA-Z0-9\s-_]+$/,
      'Name can only contain letters, numbers, spaces, dashes and underscores'
    ),
  description: z.string().max(80).optional()
});

export type CreateWorkflowSchema = z.infer<typeof createWorkflowSchema>;
