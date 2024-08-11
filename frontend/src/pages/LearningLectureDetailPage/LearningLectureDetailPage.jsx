import ArticlePreview from '../../components/Article/ArticlePreview/ArticlePreview';
import styles from './LearningLectureDetailPage.module.css';
import { useNotices } from '../../hooks/api/useNotices';
import { useParams } from 'react-router-dom';
import { useQnas } from '../../hooks/api/useQnas';

export default function LearningLectureDetailPage() {
  const { lectureId } = useParams();
  const { data: noticesData } = useNotices(lectureId);
  const notices = noticesData.pages[0]?.data.slice(0, 3);
  const { data: qnasData } = useQnas(lectureId);
  const questions = qnasData?.data.slice(0, 3);

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
    </section>
  );
}
