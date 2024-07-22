import { Link } from 'react-router-dom';
import styles from './ArticlePreview.module.css';

export default function ArticlePreview({ to, title, contents = [] }) {
  // TODO: 아이콘 변경
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        <Link to={to}>ICON</Link>
      </div>
      <div className={styles.main}>
        {contents.map((content) => {
          return (
            <div
              key={content.id}
              className={styles.content}
            >
              {content.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
