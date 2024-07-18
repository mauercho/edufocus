import LectureHeader from '../../components/LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../../components/SideBar';
import { MaxWidthLayout } from '../../components/Layout';
import { CreateArticle } from '../../components/Article';

export default function LecturerCreateNoticePage() {
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
              name={'학습 진도'}
              sub={'2 / 12'}
            />
            <SideItem
              name={'퀴즈 점수'}
              sub={'80%'}
            />
          </SideBar>
        </aside>
        <main>
          <CreateArticle
            topic="글 쓰기"
            title="공지사항"
          />
        </main>
      </MaxWidthLayout>
    </>
  );
}
