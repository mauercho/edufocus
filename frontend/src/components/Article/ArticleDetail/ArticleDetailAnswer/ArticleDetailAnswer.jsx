import styles from './ArticleDetailAnswer.module.css'


export default function ArticleDetailAnswer () {
    return (
        <>
        <div className={styles.answer}>
            <div className={styles.answerHeader}>
                <div>--</div>
                <div className={styles.author}>선생님의 답변</div>
            </div>
            <div className={styles.content}>Lorem ipsum dolor sit amet.</div>
        </div>
        </>
    )
}