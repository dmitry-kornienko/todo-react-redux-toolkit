import React from 'react';
import { useDispatch } from 'react-redux';
import styles from './TodoItem.module.scss';
import { deleteTodo, toggleStatus } from '../../store/todoSlice';
import { InputChecked } from '../UI/InputChecked/InputChecked';

export const TodoItem = ({ id, title, completed }) => {
  const dispatch = useDispatch();

  return (
    <li className={styles.todoItem}>
      <InputChecked
        checked={completed}
        onChange={() => dispatch(toggleStatus(id))}
      />
      <div className={completed ? styles.completed : null}>{title}</div>
      <button onClick={() => dispatch(deleteTodo(id))}>x</button>
    </li>
  )
}
