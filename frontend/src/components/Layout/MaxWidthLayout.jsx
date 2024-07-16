import styles from './MaxWidthLayout.module.css';

export default function MaxWidthLayout({ children, hasSideBar = false }) {
  return <div className={`${styles.area} ${hasSideBar ? styles.hasSideBar : ''}`}>{children}</div>;
}
