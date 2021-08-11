import { useState, useEffect } from 'react';
import './App.css';
import { NewTodoForm } from './components/NewTodoForm';
import { TodoList } from './components/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('/todos')
      .then((response) => response.json())
      .then((todos) => setTodos(todos));
  }, []);

  const createNewTodo = (newTodoText) => {
    fetch('/todos', {
      method: 'post',
      body: JSON.stringify({ newTodoText }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((updatedTodos) => setTodos(updatedTodos));
  };

  const deleteTodo = (todoText) => {
    fetch('/todos/delete', {
      method: 'post',
      body: JSON.stringify({ text: todoText }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((updatedTodos) => setTodos(updatedTodos));
  };

  const completeTodo = (todoText) => {
    fetch('/todos/complete', {
      method: 'post',
      body: JSON.stringify({ text: todoText }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((updatedTodos) => setTodos(updatedTodos));
  };
  return (
    <div className='App'>
      <h1>My Todos App</h1>
      <NewTodoForm onClickCreate={createNewTodo} />
      <TodoList
        todos={todos}
        onCompleteTodo={completeTodo}
        onDeleteTodo={deleteTodo}
      />
    </div>
  );
}

export default App;
