import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import useBoundStore from '../../store';
import { useAuth } from '../../hooks/api/useAuth';

export default function Header() {
  const navigate = useNavigate();
  const userType = useBoundStore((state) => state.userType);
  const { logout } = useAuth();
  const handleClick = () => {
    logout().then(navigate('/'));
  };

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
                src="/logo.svg"
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
            <Link
              to={'/live/1'}
              target="_blank"
            >
              live
            </Link>
          </li>
        </ul>
        <ul className={styles.group}>
          {userType && (
            <>
              <li>
                <Link to={'user/my'}>마이페이지</Link>
              </li>
              <li>
                <Link onClick={handleClick}>로그아웃</Link>
              </li>
            </>
          )}
          {!userType && (
            <li>
              <Link to={'/auth/login'}>로그인</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
