import styles from './AuthForm.module.css';
import { Link } from 'react-router-dom';

export default function AuthForm({ children, title, buttonText, linkProps = null, submitFunction }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    submitFunction();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.loginForm}
    >
      <span className={styles.loginText}>{title}</span>

      <div className={styles.formGroup}>{children}</div>
      <div className={styles.loginBox}>
        <button
          className={`${styles.loginButton} ${styles.textBodyStrong}`}
          type="submit"
        >
          {buttonText}
          {/* 로그인 버튼 색깔이랑 글자 색깔 바꿔야함. */}
        </button>
        {linkProps && (
          <span className={styles.textBody}>
            {linkProps.message}&nbsp;&nbsp;
            <Link
              to={linkProps.path}
              className={styles.textBodyStrong}
            >
              {linkProps.title}
            </Link>
          </span>
        )}
      </div>
    </form>
  );
}
