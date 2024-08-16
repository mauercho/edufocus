import styles from './TeacherHomePage.module.css';
import { Link } from 'react-router-dom';
import { ClassCard } from '../../components/ClassCard';
import { ClassGrid } from '../../components/ClassGrid';
import { MaxWidthLayout } from '../../components/Layout';
import { useMyLectures } from '../../hooks/api/useMyLectures';
import PlusIcon from '/src/assets/icons/plus.svg?react';

export default function TeacherHomePage() {
  const { data: myLectures } = useMyLectures();
  const onGoingClasses = myLectures?.data ?? [];

  return (
    <MaxWidthLayout>
      <ClassGrid title="내 강의">
        {onGoingClasses.map((lecture) => (
          <ClassCard
            key={lecture.id}
            path={`/lecture/${lecture.id}/class`}
            img={lecture.image}
          >
            {lecture.title}
          </ClassCard>
        ))}
        <Link
          to={'/lecture/create'}
          className={styles.add}
        >
          <PlusIcon />
          <span>새 강의 만들기</span>
        </Link>
      </ClassGrid>
    </MaxWidthLayout>
  );
}
