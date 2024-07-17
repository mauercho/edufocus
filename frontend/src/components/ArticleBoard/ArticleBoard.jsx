import { useNavigate } from 'react-router-dom';
import styles from './ArticleBoard.module.css';

export default function ArticleBoard({ title, canCreate, createArticlePath, children }) {
  const navigate = useNavigate();
  const createArticle = () => {
    navigate(createArticlePath);
  };
  // TODO : ㅁ 을 글쓰기 아이콘으로 변경
  return (
    <div className={styles.articleBoard}>
      <div className={styles.header}>
        <div className={styles.title}>{title}</div>
        {canCreate && (
          <button
            type="button"
            className={styles.button}
            onClick={createArticle}
          >
            <div>ㅁ</div>
            <div className={styles.buttonText}>글쓰기</div>
          </button>
        )}
      </div>
      <div className={styles.article}>{children}</div>
    </div>
  );
}
