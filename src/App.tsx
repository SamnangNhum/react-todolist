import './App.css';
import {useState} from 'react';
import data from './interface/data';
import TodoForm from './component/todoForm';
import TodoList from './component/todoList';
import { TodoContext } from './context/todoContext';


const App = () => {
  const [value, setValue] = useState<data[]>([]);
  return (
    <>
      <TodoContext.Provider value={{value , setValue}}>
        <TodoForm />
        <TodoList />
      </TodoContext.Provider>
    </>
  );
}

export default App;
