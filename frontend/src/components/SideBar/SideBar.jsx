import styles from './SideBar.module.css';

export default function SideBar({ children }) {
  return <aside className={styles.sidebar}>{children}</aside>;
}
