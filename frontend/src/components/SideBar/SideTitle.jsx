import styles from './SideTitle.module.css';

export default function SideTitle({ children }) {
  return <div className={styles.title}>{children}</div>;
}
