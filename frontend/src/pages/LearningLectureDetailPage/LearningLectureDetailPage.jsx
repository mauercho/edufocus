import ArticlePreview from '../../components/Article/ArticlePreview/ArticlePreview';
import styles from './LearningLectureDetailPage.module.css';
import { useNotices } from '../../hooks/api/useNotices';
import { useParams } from 'react-router-dom';

export default function LearningLectureDetailPage() {
  const { lectureId } = useParams();
  const { data: noticesData } = useNotices(lectureId);
  const notices = noticesData?.data;
  // TODO: QnA 훅 작성 후 사용
  const { data: questions } = {
    data: [
      { id: 2, title: 'Question1', sub: '7-12 오전 11:40:57' },
      { id: 3, title: 'Question2', sub: '7-12 오전 11:40:57' },
      { id: 4, title: '헷갈리는게 있어요', sub: '7-15 오전 11:40:57' },
    ],
  };
  return (
    <section className={styles.previews}>
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
    </section>
  );
}
