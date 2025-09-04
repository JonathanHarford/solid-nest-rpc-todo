import { z } from 'zod';

export const todoSchema = z.object({
  _id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const createTodoSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().optional().default(false),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().max(500).optional(),
  completed: z.boolean().optional(),
});

export type Todo = z.infer<typeof todoSchema>;
export type CreateTodoInput = z.infer<typeof createTodoSchema>;
export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;