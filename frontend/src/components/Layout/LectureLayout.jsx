import { Outlet } from 'react-router-dom';
import LectureHeader from '../LectureHeader/LectureHeader';
import { SideBar, SideLink } from '../SideBar';
import MaxWidthLayout from './MaxWidthLayout';

export default function LectureLayout() {
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
            <SideLink to={'notice'}>공지사항</SideLink>
            <SideLink to={'qna'}>Q&A</SideLink>
            <SideLink to={'file'}>수업자료</SideLink>
            <SideLink to={'quiz'}>퀴즈</SideLink>
          </SideBar>
        </aside>
        <main>
          <Outlet />
        </main>
      </MaxWidthLayout>
    </>
  );
}
