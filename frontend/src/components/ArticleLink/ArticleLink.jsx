import styles from './ArticleLink.module.css';

export default function ArticleLink() {
  return (
    <div className={styles.articleLink}>
      <span className={styles.note}>공지사항</span>
      <span className={styles.date}>07-12 14:34</span>
    </div>
  );
}
