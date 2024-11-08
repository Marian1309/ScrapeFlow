import { z } from 'zod';

export const createWorkflowSchema = z.object({
  name: z.string().max(50),
  description: z.string().max(80).optional()
});

export type CreateWorkflowSchema = z.infer<typeof createWorkflowSchema>;
