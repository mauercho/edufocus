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
        </button>
        {linkProps && (
          <span className={styles.textBody}>
            {`${linkProps.message} `}
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
