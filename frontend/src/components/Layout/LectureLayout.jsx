import { Outlet, useParams } from 'react-router-dom';
import LectureHeader from '../LectureHeader/LectureHeader';
import { SideBar, SideLink, SideItem } from '../SideBar';
import MaxWidthLayout from './MaxWidthLayout';
import { Suspense } from 'react';
import useBoundStore from '../../store';
import { useLectureInfo } from '../../hooks/api/useLectureInfo';
import LoadingIndicator from '../LoadingIndicator.jsx/LoadingIndicator';

export default function LectureLayout() {
  const { lectureId } = useParams();
  const { data } = useLectureInfo(lectureId);
  const lecture = data?.data;

  const userType = useBoundStore((state) => state.userType);

  return (
    <>
      <LectureHeader
        title={lecture.title}
        tutor={lecture.teacherName}
        // TODO: isLive를 받아올 수단 추가
        isLive={true}
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
          <Suspense fallback={<LoadingIndicator full />}>
            <Outlet />
          </Suspense>
        </main>
      </MaxWidthLayout>
    </>
  );
}
