import { createSignal, createResource } from 'solid-js';
import { CreateTodoDto, UpdateTodoDto } from './types';
import { trpc, Todo } from './trpc';

const [todos, { mutate: setTodos, refetch: refetchTodos }] = createResource(
  () => trpc.todo.list.query()
);

const [isLoading, setIsLoading] = createSignal(false);

export const todoStore = {
  todos,
  isLoading,
  refetchTodos,

  async addTodo(todoData: CreateTodoDto) {
    setIsLoading(true);
    try {
      const newTodo = await trpc.todo.create.mutate(todoData);
      setTodos((prev: Todo[] | undefined) => prev ? [...prev, newTodo] : [newTodo]);
      return newTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  },

  async updateTodo(id: string, updates: UpdateTodoDto) {
    setIsLoading(true);
    try {
      const updatedTodo = await trpc.todo.update.mutate({ id, data: updates });
      setTodos((prev: Todo[] | undefined) => 
        prev ? prev.map((todo: Todo) => todo._id === id ? updatedTodo : todo) : []
      );
      return updatedTodo;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  },

  async deleteTodo(id: string) {
    setIsLoading(true);
    try {
      await trpc.todo.delete.mutate({ id });
      setTodos((prev: Todo[] | undefined) => prev ? prev.filter((todo: Todo) => todo._id !== id) : []);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  },

  async toggleTodo(id: string) {
    const todo = todos()?.find((t: Todo) => t._id === id);
    if (todo) {
      await this.updateTodo(id, { completed: !todo.completed });
    }
  }
};