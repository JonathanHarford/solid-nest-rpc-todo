import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {
  return (
    <div class="container">
      <div class="header">
        <h1>Todo App</h1>
        <p>Built with SolidJS & NestJS</p>
      </div>
      <div class="content">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}

export default App;