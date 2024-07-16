import styles from './AuthForm.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AuthForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className={styles.loginForm}>
      <span className={styles.loginText}>로그인</span>

      <div className={styles.formGroup}>
        <div className={styles.inputBox}>
          <label
            htmlFor="username"
            className={styles.textBody}
          >
            ID
          </label>
          <input
            type="text"
            id="username"
            className={`${styles.input} ${styles.textSubheading}`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputBox}>
          <label
            htmlFor="password"
            className={styles.textBody}
          >
            비밀번호
          </label>
          <input
            className={`${styles.input} ${styles.textSubheading}`}
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Link
            to="/"
            className={`${styles.textBodyStrong} ${styles.secondaryColor}`}
          >
            비밀번호를 잊으셨나요?
          </Link>
        </div>
      </div>
      <div className={styles.loginBox}>
        <button
          className={`${styles.loginButton} ${styles.textBodyStrong}`}
          type="submit"
        >
          로그인
          {/* 로그인 버튼 색깔이랑 글자 색깔 바꿔야함. */}
        </button>
        <span className={styles.textBody}>
          아직 회원이 아니신가요?&nbsp;&nbsp;
          <Link
            to="/"
            className={styles.textBodyStrong}
          >
            회원가입
          </Link>
        </span>
      </div>
    </form>
  );
}
