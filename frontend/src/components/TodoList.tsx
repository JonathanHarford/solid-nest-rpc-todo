import { For, Show, Suspense } from 'solid-js';
import { todoStore } from '../store';
import TodoItem from './TodoItem';

function NoTodos() {
  return (
    <p style="text-align: center; color: #718096; padding: 2rem;">No todos yet. Add one above!</p>
  );
}

export default function TodoList() {
  return (
    <div>
      <Suspense fallback={<div>Loading todos...</div>}>
        <Show
          when={todoStore.todos() && todoStore.todos()!.length > 0}
          fallback={<NoTodos />}
        >
          <ul class="todo-list">
            <For each={todoStore.todos()}>
              {(todo) => <TodoItem todo={todo} />}
            </For>
          </ul>
        </Show>
      </Suspense>
    </div>
  );
}