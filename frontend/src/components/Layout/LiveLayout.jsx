import { Outlet } from 'react-router-dom';
import styles from './LiveLayout.module.css';
import { LiveHeader } from '../LiveHeader';

export default function LiveLayout() {
  return (
    <>
      <LiveHeader />
      <div className={styles.wrapper}>
        <Outlet />
      </div>
    </>
  );
}
