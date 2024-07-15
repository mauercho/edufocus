import styles from './MaxWidthLayout.module.css';

export default function MaxWidthLayout({ children }) {
  return <div className={styles.area}>{children}</div>;
}
