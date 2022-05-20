import './App.css';
import TodoForm from './component/todoForm'
import TodoList from './component/todoList'


const App = () => {
  return (
    <>
      <h2>To do list</h2>
      <TodoForm />
      <TodoList />
    </>

  );
}

export default App;
