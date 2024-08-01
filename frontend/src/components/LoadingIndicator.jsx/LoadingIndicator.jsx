import styles from './LoadingIndicator.module.css';

export default function LoadingIndicator({ fill = false }) {
  return fill ? (
    <div className={styles.wrapper}>
      <div className={styles.indicator} />
    </div>
  ) : (
    <div />
  );
}
