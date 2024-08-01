import { Outlet } from 'react-router-dom';
import { Footer } from '../Footer';
import { Header } from '../Header';
import styles from './PageLayout.module.css';
import { Suspense } from 'react';
import LoadingIndicator from '../LoadingIndicator.jsx/LoadingIndicator';

export default function PageLayout() {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <div className={styles.contents}>
          <Suspense fallback={<LoadingIndicator full />}>
            <Outlet />
          </Suspense>
        </div>
        <Footer />
      </div>
    </>
  );
}
