import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './TodoItem.module.scss';
import { removeTodo, togleTodoComplete } from '../../store/todoSlice';
import { InputChecked } from '../UI/InputChecked/InputChecked';

export const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.todoItem}>
      <InputChecked
        checked={completed}
        onChange={() => dispatch(togleTodoComplete({id}))}
      />
      <div className={completed ? styles.completed : null}>{title}</div>
      <button onClick={() => dispatch(removeTodo({id}))}>x</button>
    </li>
  )
}
