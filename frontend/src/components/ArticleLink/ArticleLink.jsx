import { Link } from 'react-router-dom';
import styles from './ArticleLink.module.css';

export default function ArticleLink({ path, title, sub }) {
  return (
    <Link
      to={path}
      className={styles.articleLink}
    >
      <span className={styles.note}>{title}</span>
      <span className={styles.date}>{sub}</span>
    </Link>
  );
}
