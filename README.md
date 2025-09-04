# SolidJS + NestJS + MongoDB Todo App

A full-stack todo application created to familiarize myself with NestJS, SolidJS, tRPC and MongoDB.

## Architecture

- **Frontend**: SolidJS with TypeScript and Vite
- **Backend**: NestJS with TypeScript
- **Database**: MongoDB with Mongoose ODM

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally on port 27017)

## Getting Started

### 1. Start the Backend

```bash
cd backend
npm install
npm run build
npm run start:dev
```

Backend will be available at http://localhost:3001

### 2. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will be available at http://localhost:3000

## Features

- ✅ Add new todos with title and description
- ✅ Mark todos as complete/incomplete
- ✅ Delete todos
- ✅ Real-time updates with SolidJS reactivity
- ✅ Responsive UI
- ✅ TypeScript throughout the stack

## API Endpoints

- `GET /todos` - Get all todos
- `POST /todos` - Create a new todo
- `GET /todos/:id` - Get a specific todo
- `PATCH /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

## Project Structure

```
├── backend/          # NestJS backend
│   ├── src/
│   │   ├── todo/     # Todo module
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── package.json
└── frontend/         # SolidJS frontend
    ├── src/
    │   ├── components/
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```


```mermaid
graph TD
    subgraph "Frontend Layer - SolidJS"
        UI[UI Components]
        AddTodo[AddTodo Component]
        TodoList[TodoList Component]
        TodoItem[TodoItem Component]
        
        Store[Todo Store<br/>Signals & Resources]
        tRPCClient[tRPC Client<br/>Type-safe API calls]
        Types[Shared Types<br/>from Backend]
    end
    
    subgraph "Backend Layer - NestJS"
        tRPCMiddleware[tRPC Express Middleware<br/>/trpc/*]
        Router[tRPC App Router]
        TodoRouter[Todo Router<br/>Procedures]
        Service[Todo Service<br/>Business Logic]
        Schemas[Zod Schemas<br/>Runtime Validation]
        MongooseSchema[Todo Schema<br/>Mongoose Model]
    end
    
    subgraph "Database Layer - MongoDB"
        Collection[Todos Collection<br/>solid-nest-todo]
        Document[Todo Documents<br/>_id, title, description<br/>completed, timestamps]
    end
    
    %% User Interactions
    User((User)) --> UI
    UI --> AddTodo
    UI --> TodoList
    TodoList --> TodoItem
    
    %% Frontend Data Flow
    AddTodo -->|createSignal| Store
    TodoItem -->|toggle/delete| Store
    Store -->|Type-safe tRPC calls| tRPCClient
    tRPCClient -->|Auto-typed responses| Store
    Store -->|createResource| TodoList
    
    %% Type Safety
    Types -->|Import types| Store
    Types -->|Import types| tRPCClient
    
    %% tRPC Communication
    tRPCClient -->|POST /trpc/todo.list<br/>POST /trpc/todo.create<br/>POST /trpc/todo.update<br/>POST /trpc/todo.delete| tRPCMiddleware
    tRPCMiddleware -->|Type-safe response| tRPCClient
    
    %% Backend Data Flow
    tRPCMiddleware --> Router
    Router --> TodoRouter
    TodoRouter -->|Input validation| Schemas
    Schemas -->|Validated data| Service
    Service -->|Database operations| MongooseSchema
    MongooseSchema -->|Mongoose queries| Collection
    Collection -->|Documents| MongooseSchema
    MongooseSchema -->|Mapped objects| Service
    Service -->|Type-safe results| TodoRouter
    TodoRouter -->|Procedure response| Router
    Router --> tRPCMiddleware
    
    %% Database Operations
    Collection --> Document
    Document --> Collection
```