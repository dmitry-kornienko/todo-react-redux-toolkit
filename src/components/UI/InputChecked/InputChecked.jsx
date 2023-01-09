import React from 'react';
import styles from './InputChecked.module.scss';

export const InputChecked = ({ checked, onChange }) => {
  return (
    <label className={styles.inputChecked}>
      <input
        type='checkbox'
        checked={checked}
        onChange={onChange}
      />
      <div className={styles.checkmark}></div>
    </label>
  )
}
