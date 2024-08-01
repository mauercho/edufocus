import { Outlet } from 'react-router-dom';
import styles from './LiveLayout.module.css';
import { LiveHeader } from '../LiveHeader';
import { Suspense } from 'react';
import LoadingIndicator from '../LoadingIndicator.jsx/LoadingIndicator';

export default function LiveLayout() {
  return (
    <>
      <LiveHeader />
      <div className={styles.wrapper}>
        <Suspense fallback={<LoadingIndicator full />}>
          <Outlet />
        </Suspense>
      </div>
    </>
  );
}
