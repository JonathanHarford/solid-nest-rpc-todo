import { router } from './trpc';
import { createTodoRouter } from './todo.router';
import { TodoService } from '../todo/todo.service';

export const createAppRouter = (todoService: TodoService) => {
  return router({
    todo: createTodoRouter(todoService),
  });
};

export type AppRouter = ReturnType<typeof createAppRouter>;