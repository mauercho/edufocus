import { Link } from 'react-router-dom';
import styles from './ArticleDetail.module.css';
import ArticleDetailAnswer from './ArticleDetailAnswer/ArticleDetailAnswer';

export default function ArticleDetail({ topic, title, author = null, content, answer = null }) {
  // TODO: 답변 작성 기능 추가

  return (
    <div className={styles.articleDetail}>
      <header>
        <div>
          <Link
            to={'..'}
            className={styles.backButton}
          >
            <div>-</div>
            <div className={styles.backText}>{topic}</div>
          </Link>
        </div>
        <div>
          <div className={styles.title}>{title}</div>
          {author && <div className={styles.author}>{author}</div>}
        </div>
      </header>
      <div>
        <p className={styles.content}>{content}</p>
      </div>
      {answer && <ArticleDetailAnswer answer={answer} />}
    </div>
  );
}
