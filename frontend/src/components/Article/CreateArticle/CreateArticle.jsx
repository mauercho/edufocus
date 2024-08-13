import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styles from './CreateArticle.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';

export default function CreateArticle({ topic, title, onSubmit }) {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleContent, setArticleContent] = useState('');
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [articleContent]);

  const handleInput = (e) => {
    const { value } = e.target;
    setArticleContent(value);
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
            maxLength={50}
            className={styles.titleInput}
            placeholder="제목을 입력하세요"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
          {articleTitle.length > 49 && <div className={styles.textLength}>{articleTitle.length} / 50</div>}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>내용</label>
          <textarea
            ref={textareaRef}
            className={styles.contentInput}
            placeholder="내용을 입력하세요"
            value={articleContent}
            maxLength={1000}
            onChange={handleInput}
            style={{ overflow: 'hidden' }}
          ></textarea>
          {articleContent.length > 999 && <div className={styles.textLength}>{articleContent.length} / 1000</div>}
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
