import { createSignal, createResource } from 'solid-js';
import { Todo, CreateTodoDto, UpdateTodoDto } from './types';
import { todoAPI } from './api';

const [todos, { mutate: setTodos, refetch: refetchTodos }] = createResource(
  () => todoAPI.getTodos()
);

const [isLoading, setIsLoading] = createSignal(false);

export const todoStore = {
  todos,
  isLoading,
  refetchTodos,

  async addTodo(todoData: CreateTodoDto) {
    setIsLoading(true);
    try {
      const newTodo = await todoAPI.createTodo(todoData);
      setTodos(prev => prev ? [...prev, newTodo] : [newTodo]);
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
      const updatedTodo = await todoAPI.updateTodo(id, updates);
      setTodos(prev => 
        prev ? prev.map(todo => todo._id === id ? updatedTodo : todo) : []
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
      await todoAPI.deleteTodo(id);
      setTodos(prev => prev ? prev.filter(todo => todo._id !== id) : []);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  },

  async toggleTodo(id: string) {
    const todo = todos()?.find(t => t._id === id);
    if (todo) {
      await this.updateTodo(id, { completed: !todo.completed });
    }
  }
};