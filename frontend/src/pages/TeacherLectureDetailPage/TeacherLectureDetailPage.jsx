import ArticlePreview from '../../components/Article/ArticlePreview/ArticlePreview';
import styles from './TeacherLectureDetailPage.module.css';
import { useNotices } from '../../hooks/api/useNotices';
import { useParams } from 'react-router-dom';
import { useQnas } from '../../hooks/api/useQnas';

export default function TeacherLectureDetailPage() {
  const { lectureId } = useParams();
  const { data: noticesData } = useNotices(lectureId);
  const notices = noticesData?.data;
  const { data: qnasData } = useQnas(lectureId);
  const questions = qnasData?.data;

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
