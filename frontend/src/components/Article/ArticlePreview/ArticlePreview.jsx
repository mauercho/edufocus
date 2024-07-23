import { Link } from 'react-router-dom';
import styles from './ArticlePreview.module.css';
import RightIcon from '/src/assets/icons/right.svg?react';

export default function ArticlePreview({ to, title, contents = [] }) {
  return (
    <div className={styles.wrapper}>
      <Link
        to={to}
        className={styles.header}
      >
        <h2 className={styles.title}>{title}</h2>
        <RightIcon />
      </Link>
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
