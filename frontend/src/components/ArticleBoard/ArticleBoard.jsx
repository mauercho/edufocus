import { Link } from 'react-router-dom';
import styles from './ArticleBoard.module.css';

export default function ArticleBoard({ title, canCreate, createArticlePath, children }) {
  // TODO : ㅁ 을 글쓰기 아이콘으로 변경
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
            <div>ㅁ</div>
            <div className={styles.buttonText}>글쓰기</div>
          </Link>
        )}
      </div>
      <div className={styles.article}>{children}</div>
    </div>
  );
}
