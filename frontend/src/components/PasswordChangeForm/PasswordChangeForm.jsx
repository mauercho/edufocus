import { useState, useRef, useEffect } from 'react';
import styles from './PasswordChangeForm.module.css';

export default function PasswordChangeForm({ onSubmit, onError }) {
  const [error, setError] = useState(null);
  const currentPasswordRef = useRef('');
  const newPasswordRef = useRef('');
  const confirmPasswordRef = useRef('');

  useEffect(() => {
    setError(onError);
  }, [onError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword === confirmPassword) {
      onSubmit(currentPassword, newPassword, confirmPassword);
    } else {
      setError('confirmError');
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={styles.passwordChangeForm}
    >
      <span className={styles.passwordText}>비밀번호 변경</span>
      <div className={styles.inputGroup}>
        <label htmlFor="currentPassword">현재 비밀번호</label>
        <input
          type="password"
          id="currentPassword"
          ref={currentPasswordRef}
          maxLength={50}
          className={error === 'currentPwError' ? styles.inputErrorBox : styles.inputBox}
          required
        />
        {error === 'currentPwError' && <div className={styles.errorMessage}>현재 비밀번호가 일치하지 않습니다.</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="newPassword">새 비밀번호</label>
        <input
          type="password"
          id="newPassword"
          ref={newPasswordRef}
          maxLength={50}
          className={error === 'samePwError' ? styles.inputErrorBox : styles.inputBox}
          required
        />
        {error === 'samePwError' && <div className={styles.errorMessage}>현재 비밀번호와 같은 비밀번호입니다.</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword">새 비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          maxLength={50}
          className={error === 'confirmError' ? styles.inputErrorBox : styles.inputBox}
          required
        />
        {error === 'confirmError' && <div className={styles.errorMessage}>비밀번호가 일치하지 않습니다.</div>}
      </div>
      <button
        className={styles.button}
        type="submit"
      >
        비밀번호 변경
      </button>
    </form>
  );
}
