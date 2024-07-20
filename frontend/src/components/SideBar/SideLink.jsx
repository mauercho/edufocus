import { NavLink } from 'react-router-dom';
import styles from './SideLink.module.css';

export default function SideLink({ children, to }) {
  return (
    <li className={styles.list}>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
      >
        {children}
      </NavLink>
    </li>
  );
}
