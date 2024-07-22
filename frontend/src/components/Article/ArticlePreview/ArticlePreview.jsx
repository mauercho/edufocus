import { Link } from 'react-router-dom';
import styles from './ArticlePreview.module.css';

export default function ArticlePreview({ to, title, contents = [] }) {
  // TODO: 아이콘 변경
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Link
          to={to}
          className={styles.title}
        >
          {title}
        </Link>
        <Link to={to}>ICON</Link>
      </div>
      <div className={styles.main}>
        {contents.map((content) => {
          return (
            <Link
              to={`${to}/${content.id}`}
              key={content.id}
              className={styles.content}
            >
              {content.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
