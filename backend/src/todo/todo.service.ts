import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from './todo.schema';
import { CreateTodoInput, UpdateTodoInput } from '../trpc/schemas';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}

  async create(createTodoInput: CreateTodoInput): Promise<Todo> {
    const createdTodo = new this.todoModel(createTodoInput);
    return createdTodo.save();
  }

  async findAll(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  async update(id: string, updateTodoInput: UpdateTodoInput): Promise<Todo> {
    return this.todoModel.findByIdAndUpdate(id, updateTodoInput, { new: true }).exec();
  }

  async remove(id: string): Promise<Todo> {
    return this.todoModel.findByIdAndDelete(id).exec();
  }
}