import useBoundStore from '../../store';
import StudentHomePage from '../StudentHomePage/StudentHomePage';
import TeacherHomePage from '../TeacherHomePage';
import DefaultHomePage from '../DefaultHomePage';

export default function HomePage() {
  const userType = useBoundStore((state) => state.userType);
  switch (userType) {
    case 'student':
      return <StudentHomePage />;
    case 'teacher':
      return <TeacherHomePage />;
    default:
      return <DefaultHomePage />;
  }
}
