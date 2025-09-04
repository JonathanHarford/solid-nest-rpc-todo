import { z } from 'zod';
import { router, publicProcedure } from './trpc';
import { createTodoSchema, updateTodoSchema, Todo } from './schemas';
import { TodoService } from '../todo/todo.service';

export const createTodoRouter = (todoService: TodoService) => {
  return router({
    list: publicProcedure.query(async (): Promise<Todo[]> => {
      const todos = await todoService.findAll();
      return todos.map(todo => ({
        _id: (todo as any)._id.toString(),
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        createdAt: (todo as any).createdAt?.toISOString() || new Date().toISOString(),
        updatedAt: (todo as any).updatedAt?.toISOString() || new Date().toISOString(),
      }));
    }),

    create: publicProcedure
      .input(createTodoSchema)
      .mutation(async ({ input }): Promise<Todo> => {
        const todo = await todoService.create(input);
        return {
          _id: (todo as any)._id.toString(),
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          createdAt: (todo as any).createdAt?.toISOString() || new Date().toISOString(),
          updatedAt: (todo as any).updatedAt?.toISOString() || new Date().toISOString(),
        };
      }),

    update: publicProcedure
      .input(z.object({
        id: z.string(),
        data: updateTodoSchema,
      }))
      .mutation(async ({ input }): Promise<Todo> => {
        const todo = await todoService.update(input.id, input.data);
        return {
          _id: (todo as any)._id.toString(),
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          createdAt: (todo as any).createdAt?.toISOString() || new Date().toISOString(),
          updatedAt: (todo as any).updatedAt?.toISOString() || new Date().toISOString(),
        };
      }),

    delete: publicProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input }): Promise<{ success: boolean }> => {
        await todoService.remove(input.id);
        return { success: true };
      }),

    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(async ({ input }): Promise<Todo> => {
        const todo = await todoService.findOne(input.id);
        return {
          _id: (todo as any)._id.toString(),
          title: todo.title,
          description: todo.description,
          completed: todo.completed,
          createdAt: (todo as any).createdAt?.toISOString() || new Date().toISOString(),
          updatedAt: (todo as any).updatedAt?.toISOString() || new Date().toISOString(),
        };
      }),
  });
};