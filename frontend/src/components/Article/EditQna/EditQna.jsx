import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './EditQna.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';

export default function EditQna({ topic, title, prevContent, prevTitle, onSubmit }) {
  const [articleTitle, setArticleTitle] = useState(prevTitle);
  const [articleContent, setArticleContent] = useState(prevContent);
  const textAreaRef = useRef(null);

  useEffect(() => {
    adjustTextAreaHeight();
  }, [articleContent]);

  const adjustTextAreaHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };

  const handleInput = (e) => {
    setArticleContent(e.target.value);
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
            maxLength={200}
            className={styles.titleInput}
            placeholder={'제목을 입력하세요'}
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
          />
          {articleTitle.length > 190 && <div className={styles.textLength}>{articleTitle.length} / 200</div>}
        </div>
        <div className={styles.fieldWrapper}>
          <label className={styles.label}>내용</label>
          <textarea
            ref={textAreaRef}
            maxLength={1000}
            className={styles.contentInput}
            placeholder="내용을 입력하세요"
            value={articleContent}
            onChange={handleInput}
          ></textarea>
          {articleContent.length > 950 && <div className={styles.textLength}>{articleContent.length} / 1000</div>}
        </div>
        <button
          type="button"
          className={styles.button}
          onClick={(e) => onSubmit(e, articleTitle, articleContent)}
          disabled={!articleTitle || !articleContent}
        >
          <EditIcon />
          <div>글 수정하기</div>
        </button>
      </form>
    </div>
  );
}
