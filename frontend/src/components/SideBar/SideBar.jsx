import styles from './SideBar.module.css';

export default function SideBar({ title, children }) {
  return (
    <div className={styles.group}>
      <h3 className={styles.groupTitle}>{title}</h3>
      <ul className={styles.groupList}>{children}</ul>
    </div>
  );
}
