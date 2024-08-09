import { forwardRef } from 'react';
import styles from './InputBox.module.css';

export default forwardRef(function InputBox({ title, id = null, type, hasError = null, children }, ref) {
  return (
    <div className={`${styles.inputBox} ${hasError && styles.errorBox}`}>
      <label
        htmlFor={id}
        className={styles.textBody}
      >
        {title}
      </label>
      <input
        type={type}
        id={id}
        className={`${styles.input} ${styles.textSubheading}`}
        ref={ref}
        maxLength={200}
        required
      />
      {children}
    </div>
  );
});
