import React from 'react';
import styles from './Btn.module.scss';

export const Btn = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={styles.btn}
    >
      {children}
    </button>
  )
}
