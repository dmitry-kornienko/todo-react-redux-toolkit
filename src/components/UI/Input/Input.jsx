import React from 'react';
import styles from './Input.module.scss';

export const Input = ({ value, setValue, ...props }) => {
  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className={styles.input}
      {...props}
    />
  )
}
