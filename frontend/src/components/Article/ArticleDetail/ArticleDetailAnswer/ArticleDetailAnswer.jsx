import styles from './ArticleDetailAnswer.module.css';
import ReplyIcon from '/src/assets/icons/reply.svg?react';

export default function ArticleDetailAnswer({ answer }) {
  return (
    <section className={styles.answer}>
      <div className={styles.answerHeader}>
        <ReplyIcon />
        <div className={styles.author}>선생님의 답변</div>
      </div>
      <p className={styles.content}>{answer}</p>
    </section>
  );
}
