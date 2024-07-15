import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './PageLayout.module.css';

export default function PageLayout({ children }) {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <div className={styles.contents}>{children}</div>
        <Footer />
      </div>
    </>
  );
}
