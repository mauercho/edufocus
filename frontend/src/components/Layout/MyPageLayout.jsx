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
            <SideLink
              to={''}
              end
            >
              수강중인 강의
            </SideLink>
            <SideLink to={'edit'}>개인정보 변경</SideLink>
            <SideLink to={'changePw'}>비밀번호 변경</SideLink>
          </SideBar>
        </aside>
        <main>
          {/* TODO: 로딩 컴포넌트 추가 */}
          <Suspense fallback={<div>loading</div>}>
            <Outlet />
          </Suspense>
        </main>
      </MaxWidthLayout>
    </>
  );
}
