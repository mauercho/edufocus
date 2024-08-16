import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.title}>EduFocus</div>
        <div>Copyright © 2024 EduFocus 모든 권리 보유.</div>
        <ul className={styles.linkList}>
          <li>
            <Link to={'/'}>서비스 이용약관</Link>
          </li>
          <li className={styles.divider} />
          <li>
            <Link to={'/'}>개인정보 처리방침</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
