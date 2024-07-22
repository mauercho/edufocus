import { Outlet } from 'react-router-dom';
import MaxWidthLayout from '../../components/Layout/MaxWidthLayout';
import SideBar from '../../components/SideBar/SideBar';
import SideLink from '../../components/SideBar/SideLink';
import { Suspense } from 'react';

export default function MyPageLayout() {
  return (
    <>
      <MaxWidthLayout hasSideBar>
        <aside>
          <SideBar title="마이페이지">
            <SideLink to={'change-info'}>계정 정보 변경</SideLink>
            <SideLink to={'password-change'}>비밀번호 변경</SideLink>
            <SideLink
              to={''}
              end
            >
              수강중인 강의
            </SideLink>
          </SideBar>
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
