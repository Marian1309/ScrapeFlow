import { z } from 'zod';

export const createWorkflowSchema = z.object({
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .max(50, 'Name cannot exceed 50 characters')
    .trim()
    .regex(
      /^[a-zA-Z0-9\s-_]+$/,
      'Name can only contain letters, numbers, spaces, dashes and underscores'
    ),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(80, 'Description cannot exceed 80 characters')
});

export type CreateWorkflowSchema = z.infer<typeof createWorkflowSchema>;
