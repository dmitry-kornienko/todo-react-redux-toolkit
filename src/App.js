import { useSelector } from 'react-redux';
import {FormAddTodo} from './components/FormAddTodo';
import {TodoList} from './components/TodoList';
import {Loader} from './components/UI/Loader';

export default function App() {
  const { status, error } = useSelector(state => state.todos)

  return (
    <>
      <FormAddTodo />
      {status === 'loading' && <Loader />}
      {error && <h3>An error occured: {error}</h3>}
      <TodoList />
    </>
  )
}
