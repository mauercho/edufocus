import { useState, useRef } from 'react';
import styles from './PasswordChangeForm.module.css';

export default function PasswordChangeForm({ onSubmit, onPwError = false }) {
  const [errorConfirmMessage, setErrorConfirmMessage] = useState(false);
  const [errorSameMessage, setErrorSameMessage] = useState(false);
  const currentPasswordRef = useRef('');
  const newPasswordRef = useRef('');
  const confirmPasswordRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (newPassword === confirmPassword) {
      setErrorConfirmMessage(false);
      onSubmit(currentPassword, newPassword, confirmPassword);

      if (onPwError) {
        setErrorSameMessage(true);
      } else {
        setErrorSameMessage(false);
      }
    } else {
      setErrorConfirmMessage(true);
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
          className={errorSameMessage ? styles.inputErrorBox : styles.inputBox}
          required
        />
        {errorSameMessage && <div className={styles.errorMessage}>현재 비밀번호가 일치하지 않습니다.</div>}
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="newPassword">새 비밀번호</label>
        <input
          type="password"
          id="newPassword"
          ref={newPasswordRef}
          className={styles.inputBox}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword">새 비밀번호 확인</label>
        <input
          type="password"
          id="confirmPassword"
          ref={confirmPasswordRef}
          className={errorConfirmMessage ? styles.inputErrorBox : styles.inputBox}
          required
        />
        {errorConfirmMessage && <div className={styles.errorMessage}>비밀번호가 일치하지 않습니다.</div>}
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
