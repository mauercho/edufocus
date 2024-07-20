import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './PageLayout.module.css';

export default function PageLayout() {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <div className={styles.contents}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
