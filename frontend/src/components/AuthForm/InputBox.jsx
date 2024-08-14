import { forwardRef, useState } from 'react';
import styles from './InputBox.module.css';

export default forwardRef(function InputBox(
  { title, id = null, type, hasError = null, children, maxLength = 50 },
  ref
) {
  const [isMaxLengthReached, setIsMaxLengthReached] = useState(false);

  const handleInput = (e) => {
    if (e.target.value.length >= maxLength) {
      setIsMaxLengthReached(true);
    } else {
      setIsMaxLengthReached(false);
    }
  };
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
        maxLength={maxLength}
        onInput={handleInput}
        required
      />
      {isMaxLengthReached && <div className={styles.maxLengthMessage}>최대 {maxLength}자까지 입력 가능합니다</div>}
      {children}
    </div>
  );
});
