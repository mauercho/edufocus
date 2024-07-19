import { forwardRef } from 'react';
import styles from './InputBox.module.css';

const InputBox = forwardRef(({ title, id = null, type, children }, ref) => {
  return (
    <div className={styles.inputBox}>
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
        required
      />
      {children}
    </div>
  );
});
InputBox.displayName = 'InputBox';

export default InputBox;
