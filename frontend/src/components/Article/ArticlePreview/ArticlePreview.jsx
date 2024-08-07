import { Link } from 'react-router-dom';
import styles from './ArticlePreview.module.css';
import RightIcon from '/src/assets/icons/right.svg?react';

export default function ArticlePreview({ to, title, contents = [] }) {
  const hasContents = contents.length > 0;

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
        {hasContents ? (
          contents.map?.((content) => {
            return (
              <Link
                to={`${to}/${content.id}`}
                key={content.id}
                className={styles.content}
              >
                {content.title}
              </Link>
            );
          })
        ) : (
          <div className={styles.empty}>아직 작성된 글이 없습니다.</div>
        )}
      </div>
    </div>
  );
}
