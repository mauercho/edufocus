import styles from './SideItem.module.css';

export default function SideItem({ name, sub }) {
  return (
    <li className={styles.item}>
      <div>{name}</div>
      <div className={styles.sub}>{sub}</div>
    </li>
  );
}
