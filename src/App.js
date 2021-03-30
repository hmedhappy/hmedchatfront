import './App.css';
import TodoList from './components/TodoList';
import { useState } from 'react';
import Login from './components/Login';

function App() {
  const [chatuser, setchatuser] = useState(localStorage.getItem('chatUser'));
  return chatuser ? <TodoList /> : <Login />;
}
export default App;
