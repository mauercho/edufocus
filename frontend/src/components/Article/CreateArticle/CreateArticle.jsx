import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './CreateArticle.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';

export default function CreateArticle({ topic, title, onSubmit }) {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');

  const handleInput = (e) => {
    setArticleContent(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
  };

  return (
    <div className={styles.createArticle}>
      <header className={styles.header}>
        <Link
          to={'..'}
          className={styles.goBack}
        >
          <BackIcon />
          <span>{title}</span>
        </Link>
        <div className={styles.title}>{topic}</div>
      </header>
      <form
        className={styles.formWrapper}
        onSubmit={(e) => onSubmit(e, articleTitle, articleContent)}
      >
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>제목</label>
          <input
            type="text"
            maxLength={255}
            className={styles.titleInput}
            placeholder="제목을 입력하세요"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>내용</label>
          <textarea
            className={styles.contentInput}
            placeholder="내용을 입력하세요"
            value={articleContent}
            onChange={handleInput}
          ></textarea>
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={(e) => onSubmit(e, articleTitle, articleContent)}
          disabled={!articleTitle || !articleContent}
        >
          <EditIcon />
          <div>글 쓰기</div>
        </button>
      </form>
    </div>
  );
}
