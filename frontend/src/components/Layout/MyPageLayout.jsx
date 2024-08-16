import { Outlet } from 'react-router-dom';
import MaxWidthLayout from '../../components/Layout/MaxWidthLayout';
import SideBar from '../../components/SideBar/SideBar';
import SideLink from '../../components/SideBar/SideLink';
import { Suspense } from 'react';
import LoadingIndicator from '../LoadingIndicator.jsx/LoadingIndicator';
import useBoundStore from '../../store';

export default function MyPageLayout() {
  const userType = useBoundStore((state) => state.userType);
  const myLectureTitle = userType === 'student' ? '수강중인 강의' : '내 강의';

  return (
    <>
      <MaxWidthLayout hasSideBar>
        <aside>
          <SideBar title="마이페이지">
            <SideLink
              to={''}
              end
            >
              {myLectureTitle}
            </SideLink>
            <SideLink to={'edit'}>개인정보 변경</SideLink>
            <SideLink to={'changePw'}>비밀번호 변경</SideLink>
          </SideBar>
        </aside>
        <main>
          <Suspense fallback={<LoadingIndicator fill />}>
            <Outlet />
          </Suspense>
        </main>
      </MaxWidthLayout>
    </>
  );
}
