import { Link } from 'react-router-dom';
import styles from './SideLink.module.css';

export default function SideLink({ children, path }) {
  return (
    <li className={styles.list}>
      <Link
        to={path}
        className={styles.link}
      >
        {children}
      </Link>
    </li>
  );
}
