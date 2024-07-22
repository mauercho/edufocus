import ArticlePreview from '../../components/Article/ArticlePreview/ArticlePreview';
import styles from './TeacherLectureDetailPage.module.css';

export default function TeacherLectureDetailPage() {
  const { data: notices } = {
    data: [
      { id: 1, title: '공지사항1', sub: '7-12 오전 11:40:57' },
      { id: 2, title: '공지사하앙2', sub: '7-12 오전 11:40:57' },
      { id: 3, title: '공지사하앙33', sub: '7-15 오전 11:40:57' },
      { id: 4, title: '제목만 있는 경우' },
    ],
  };

  const { data: questions } = {
    data: [
      { id: 2, title: 'Question1', sub: '7-12 오전 11:40:57' },
      { id: 3, title: 'Question2', sub: '7-12 오전 11:40:57' },
      { id: 4, title: '헷갈리는게 있어요', sub: '7-15 오전 11:40:57' },
      { id: 5, title: '궁금궁금', sub: '7-15 오전 11:40:57' },
    ],
  };

  return (
    <main className={styles.previews}>
      {/* FIXME: 밑에 ArticlePreview 바꿔야함. 공지사항 Q&A 커리큘럼 으로 나눠서 작성할 수 있게 바꾸고 링크 상위 3개만 받고 링크 줄 수 있게 할지 말지. 이거 바꾸면 LearningLectureDetailPage도 똑같이 바꾸면 될듯*/}
      <ArticlePreview
        to="notice"
        title="공지사항"
        contents={notices}
      />
      <ArticlePreview
        to="qna"
        title="Q&A"
        contents={questions}
      />
      <ArticlePreview title="커리큘럼" />
    </main>
  );
}
