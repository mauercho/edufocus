import BackIcon from '/src/assets/icons/back.svg?react';
import { Link } from 'react-router-dom';
import styles from './ArticleDetail.module.css';
import ArticleDetailAnswer from './ArticleDetailAnswer/ArticleDetailAnswer';

export default function ArticleDetail({ topic, title, author = null, content, answer = null }) {
  // TODO: 답변 작성 기능 추가

  return (
    <div className={styles.articleDetail}>
      <header className={styles.header}>
        <Link
          to={'..'}
          className={styles.goBack}
        >
          <BackIcon />
          <span>{topic}</span>
        </Link>
        <div>
          <h1 className={styles.title}>{title}</h1>
          {author && <span className={styles.author}>{author}</span>}
        </div>
      </header>
      <div>
        <p className={styles.content}>{content}</p>
      </div>
      {answer && <ArticleDetailAnswer answer={answer} />}
    </div>
  );
}
