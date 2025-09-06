import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter, Todo, CreateTodoInput, UpdateTodoInput } from 'backend/index';

// Re-export types for convenience
export type { Todo, CreateTodoInput, UpdateTodoInput };

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3001/trpc',
    }),
  ],
});