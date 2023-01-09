import styles from './FormAddTodo.module.scss';
import { Input } from '../UI/Input'
import { Btn } from '../UI/Btn/Btn';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/todoSlice';

export const FormAddTodo = () => {
  const [text, setText] = useState('');
  const dispath = useDispatch();

  const addTask = () => {
    if (text.trim().length) {
      dispath(addTodo({text}));
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
