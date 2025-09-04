import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import * as cors from 'cors';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { createAppRouter } from './trpc/app.router';
import { TodoService } from './todo/todo.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Get the TodoService instance for tRPC
  const todoService = app.get(TodoService);
  const appRouter = createAppRouter(todoService);

  // Add tRPC middleware
  const expressInstance = app.getHttpAdapter().getInstance();
  expressInstance.use(
    '/trpc',
    createExpressMiddleware({
      router: appRouter,
      createContext: () => ({}),
    })
  );
  
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
  console.log('tRPC endpoint available at http://localhost:3001/trpc');
}
bootstrap();