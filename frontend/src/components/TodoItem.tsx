import { Todo } from '../types';
import { todoStore } from '../store';

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem(props: TodoItemProps) {
  const handleToggle = () => {
    todoStore.toggleTodo(props.todo._id);
  };

  const handleDelete = () => {
    todoStore.deleteTodo(props.todo._id);
  };

  return (
    <li class={`todo-item ${props.todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        class="todo-checkbox"
        checked={props.todo.completed}
        onChange={handleToggle}
      />
      <div class="todo-content" style="flex: 1;">
        <div class="todo-text">{props.todo.title}</div>
        {props.todo.description && (
          <div class="todo-description">{props.todo.description}</div>
        )}
      </div>
      <div class="todo-actions">
        <button class="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}