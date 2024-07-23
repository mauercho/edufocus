import EditIcon from '/src/assets/icons/edit.svg?react';
import { Link } from 'react-router-dom';
import styles from './ArticleBoard.module.css';

export default function ArticleBoard({ title, canCreate, children }) {
  return (
    <div className={styles.articleBoard}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {canCreate && (
          <Link
            type="button"
            className={styles.writeButton}
            to="write"
          >
            <EditIcon className={styles.icon} />
            <div className={styles.buttonText}>글쓰기</div>
          </Link>
        )}
      </div>
      <div className={styles.article}>{children}</div>
    </div>
  );
}
