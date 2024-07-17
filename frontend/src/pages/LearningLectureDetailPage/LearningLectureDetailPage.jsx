import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../../components/SideBar';
import { MaxWidthLayout } from '../../components/Layout';
import ArticlePreview from '../../components/Article/ArticlePreview/ArticlePreview';
import styles from './LearningLectureDetailPage.module.css';

export default function LearningLectureDetailPage() {
  const lecture = {
    title: '정보처리기사 실기 완전정복',
    tutor: '박정민',
    isLive: true,
  };
  return (
    <>
      <LectureHeader
        title={lecture.title}
        tutor={lecture.tutor}
        isLive={lecture.isLive}
      />
      <MaxWidthLayout hasSideBar>
        <aside>
          <SideBar title="바로가기">
            <SideLink to={'/'}>공지사항</SideLink>
            <SideLink to={'/'}>Q&A</SideLink>
            <SideLink to={'/'}>수업자료</SideLink>
            <SideLink to={'/'}>퀴즈</SideLink>
          </SideBar>

          <SideBar title="내 학습">
            <SideItem
              name={'학습 진도'}
              sub={'2 / 12'}
            />
            <SideItem
              name={'퀴즈 점수'}
              sub={'80%'}
            />
          </SideBar>
        </aside>
        <main className={styles.previews}>
          <ArticlePreview />
          <ArticlePreview />
          <ArticlePreview />
        </main>
      </MaxWidthLayout>
    </>
  );
}
