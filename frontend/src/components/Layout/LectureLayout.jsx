import { Outlet } from 'react-router-dom';
import LectureHeader from '../LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../SideBar';
import MaxWidthLayout from './MaxWidthLayout';
import { Suspense } from 'react';
import useBoundStore from '../../store';

export default function LectureLayout() {
  const { data: lecture } = {
    data: {
      title: '정보처리기사 실기 완전정복',
      tutor: '박정민',
      isLive: true,
    },
  };

  const userType = useBoundStore((state) => state.userType);

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
            <SideLink
              to={''}
              end
            >
              수업 홈
            </SideLink>
            <SideLink to={'notice'}>공지사항</SideLink>
            <SideLink to={'qna'}>Q&A</SideLink>
            <SideLink to={'file'}>수업자료</SideLink>
            <SideLink to={'quiz'}>퀴즈</SideLink>
          </SideBar>
          {userType === 'teacher' && (
            <SideBar title="수업 정보">
              <SideItem
                name="수강생"
                sub="총 12명"
              />
            </SideBar>
          )}
          {userType === 'student' && (
            <SideBar title="내 학습">
              <SideItem
                name="진도율"
                sub="2 / 12"
              />
              <SideItem
                name="퀴즈 정답률"
                sub="80%"
              />
            </SideBar>
          )}
        </aside>
        <main>
          <Suspense fallback={<div>loading</div>}>
            <Outlet />
          </Suspense>
        </main>
      </MaxWidthLayout>
    </>
  );
}
