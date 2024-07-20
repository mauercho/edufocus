import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './PageLayout.module.css';
import { Suspense } from 'react';

export default function PageLayout() {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <div className={styles.contents}>
          <Suspense fallback={<div>loading</div>}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
    </>
  );
}
