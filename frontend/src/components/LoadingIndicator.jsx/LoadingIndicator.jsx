import styles from './LoadingIndicator.module.css';

export default function LoadingIndicator({ fill = false, label }) {
  return fill ? (
    <div className={styles.wrapper}>
      <div className={styles.indicator} />
      {label && <div className={styles.label}>{label}</div>}
    </div>
  ) : (
    <div className={styles.indicator} />
  );
}
