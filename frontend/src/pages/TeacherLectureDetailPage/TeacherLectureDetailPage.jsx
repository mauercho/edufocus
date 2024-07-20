import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../../components/SideBar';
import { MaxWidthLayout } from '../../components/Layout';
import ArticlePreview from '../../components/Article/ArticlePreview/ArticlePreview';
import styles from './TeacherLectureDetailPage.module.css';

export default function TeacherLectureDetailPage() {
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

          <SideBar title="내 강의">
            <SideItem
              name={'강의 진도'}
              sub={'2 / 12'}
            />
            <SideItem
              name={'퀴즈 정답률'}
              sub={'80%'}
            />
          </SideBar>
        </aside>
        {/* FIXME: 밑에 ArticlePreview 바꿔야함. 공지사항 Q&A 커리큘럼 으로 나눠서 작성할 수 있게 바꾸고 링크 상위 3개만 받고 링크 줄 수 있게 할지 말지. 이거 바꾸면 LearningLectureDetailPage도 똑같이 바꾸면 될듯*/}
        <main className={styles.previews}>
          <ArticlePreview />
          <ArticlePreview />
          <ArticlePreview />
        </main>
      </MaxWidthLayout>
    </>
  );
}
