import useBoundStore from '../../store';
import StudentHomePage from '../StudentHomePage/StudentHomePage';
import TeacherHomePage from '../TeacherHomePage';

export default function HomePage() {
  const userType = useBoundStore((state) => state.userType);
  // TODO: 비로그인 페이지 추가하기
  switch (userType) {
    case 'student':
      return <StudentHomePage />;
    case 'teacher':
      return <TeacherHomePage />;
    default:
      return <StudentHomePage />;
  }
}
