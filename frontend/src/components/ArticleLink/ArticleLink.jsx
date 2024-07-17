import { Link } from 'react-router-dom';
import styles from './ArticleLink.module.css';

export default function ArticleLink({ path, title, noticeDate }) {
  return (
    <Link
      to={path}
      className={styles.articleLink}
    >
      <span className={styles.note}>{title}</span>
      <span className={styles.date}>{noticeDate}</span>
    </Link>
  );
}
