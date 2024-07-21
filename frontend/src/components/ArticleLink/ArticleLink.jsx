import { Link } from 'react-router-dom';
import styles from './ArticleLink.module.css';

export default function ArticleLink({ to, title, sub }) {
  return (
    <Link
      to={to}
      className={styles.articleLink}
    >
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.date}>{sub}</span>
    </Link>
  );
}
