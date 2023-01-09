import React from 'react';
import { useSelector } from 'react-redux';
import { TodoItem } from '../TodoItem/TodoItem';
import styles from './TodoList.module.scss';

export const TodoList = () => {
  const todos = useSelector(state => state.todos.todos)
  return (
    <>
      {todos.length > 0 &&
        <ul className={styles.todoList}>
          {todos.map((todo) => 
            <TodoItem key={todo.id} {...todo} />
          )}
        </ul>
      }
    </>
  )
}
