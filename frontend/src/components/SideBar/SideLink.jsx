import { NavLink } from 'react-router-dom';
import styles from './SideLink.module.css';

export default function SideLink({ children, to, state = null, end = false }) {
  return (
    <li className={styles.list}>
      <NavLink
        to={to}
        state={{ from: state }}
        className={({ isActive }) => (isActive ? styles.active : styles.link)}
        end={end}
      >
        {children}
      </NavLink>
    </li>
  );
}
