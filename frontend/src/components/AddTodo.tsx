import { createSignal } from 'solid-js';
import { todoStore } from '../store';

export default function AddTodo() {
  const [title, setTitle] = createSignal('');
  const [description, setDescription] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    const titleValue = title().trim();
    const descValue = description().trim();
    
    if (!titleValue) return;

    try {
      await todoStore.addTodo({
        title: titleValue,
        description: descValue || undefined,
        completed: false
      });
      
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="add-todo">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <input
          type="text"
          placeholder="What needs to be done?"
          value={title()}
          onInput={(e) => setTitle(e.currentTarget.value)}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description()}
          onInput={(e) => setDescription(e.currentTarget.value)}
          style="font-size: 0.875rem;"
        />
      </div>
      <button type="submit" disabled={todoStore.isLoading()}>
        {todoStore.isLoading() ? 'Adding...' : 'Add Todo'}
      </button>
    </form>
  );
}