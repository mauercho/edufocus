import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.group}>
          <li>
            <Link
              to={'/'}
              className={styles.logo}
            >
              <img
                src="/src/assets/logo.svg"
                alt="logo"
              />
            </Link>
          </li>
          <li>
            <Link to={'/'}>전체 강의</Link>
          </li>
          <li>
            <Link to={'/'}>수강중인 강의</Link>
          </li>
          <li>
            <Link to={'/'}>내 학습</Link>
          </li>
        </ul>
        <ul className={styles.group}>
          <li>
            <Link to={'/'}>마이페이지</Link>
          </li>
          <li>
            <Link to={'/'}>로그인</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
