import styles from './ClassGrid.module.css';

export default function ClassGrid({ title, children }) {
  return (
    <section>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.grid}>{children}</div>
    </section>
  );
}
