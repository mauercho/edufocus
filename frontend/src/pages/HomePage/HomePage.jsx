import useBoundStore from '../../store';
import StudentHomePage from '../StudentHomePage/StudentHomePage';

export default function HomePage() {
  const userType = useBoundStore((state) => state.userType);

  switch (userType) {
    case 'student':
      return <StudentHomePage />;
    case 'teacher':
      return <div>teacher home</div>;
    default:
      return <StudentHomePage />;
  }
}
