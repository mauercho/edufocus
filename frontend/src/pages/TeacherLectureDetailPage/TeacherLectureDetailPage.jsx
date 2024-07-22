import ArticlePreview from '../../components/Article/ArticlePreview/ArticlePreview';
import styles from './TeacherLectureDetailPage.module.css';

export default function TeacherLectureDetailPage() {
  // const { data : articleBoards } = {
  //   data : [
  //     {}
  //   ]
  // }
  return (
    <main className={styles.previews}>
      {/* FIXME: 밑에 ArticlePreview 바꿔야함. 공지사항 Q&A 커리큘럼 으로 나눠서 작성할 수 있게 바꾸고 링크 상위 3개만 받고 링크 줄 수 있게 할지 말지. 이거 바꾸면 LearningLectureDetailPage도 똑같이 바꾸면 될듯*/}
      <ArticlePreview />
      <ArticlePreview />
      <ArticlePreview />
    </main>
  );
}
