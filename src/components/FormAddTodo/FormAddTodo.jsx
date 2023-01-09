import styles from './FormAddTodo.module.scss';
import { Input } from '../UI/Input'
import { Btn } from '../UI/Btn/Btn';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewTodo, fetchTodos } from '../../store/todoSlice';

export const FormAddTodo = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch]);

  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text));
      setText('');
    }
  };

  return (
    <div className={styles.formAddTodo}>
      <Input
        value={text}
        setValue={setText}
        placeholder='What needs to be done?'
      />
      <Btn onClick={addTask}>Add Task</Btn>
    </div>
  )
}
