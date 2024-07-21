import { Link } from 'react-router-dom';
import styles from './ArticleLink.module.css';

export default function ArticleLink({ to, title, sub }) {
  return (
    <Link
      to={to}
      className={styles.articleLink}
    >
      <span className={styles.note}>{title}</span>
      <span className={styles.date}>{sub}</span>
    </Link>
  );
}
