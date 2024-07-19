import { InfoEditForm } from '../../components/InfoEditForm';
import MaxWidthLayout from '../../components/Layout/MaxWidthLayout';
import SideBar from '../../components/SideBar/SideBar';
import SideLink from '../../components/SideBar/SideLink';

export default function MyInfoChangePage() {
  return (
    <>
      <MaxWidthLayout hasSideBar>
        <aside>
          <SideBar title="마이페이지">
            <SideLink to={'/'}>계정 정보 변경</SideLink>
            <SideLink to={'/'}>비밀번호 변경</SideLink>
            <SideLink to={'/'}>수강중인 강의</SideLink>
          </SideBar>
        </aside>
        <main>
          <InfoEditForm />
        </main>
      </MaxWidthLayout>
    </>
  );
}
