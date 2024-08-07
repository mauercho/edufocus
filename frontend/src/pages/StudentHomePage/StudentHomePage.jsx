import styles from './StudentHomePage.module.css';
import { ClassCard } from '../../components/ClassCard';
import { ClassGrid } from '../../components/ClassGrid';
import { MaxWidthLayout } from '../../components/Layout';
import { useLectures } from '../../hooks/api/useLectures';
import { useMyLectures } from '../../hooks/api/useMyLectures';

export default function StudentHomePage() {
  const { data: myLectures } = useMyLectures();
  const onGoingClasses = myLectures?.data ?? [];
  const hasOnGoingClasses = onGoingClasses.length > 0;

  const { data: allLectures } = useLectures();
  const allClasses = allLectures?.data ?? [];

  return (
    <MaxWidthLayout>
      <ClassGrid title="수강중인 강의">
        {hasOnGoingClasses ? (
          onGoingClasses.map?.((lecture) => (
            <ClassCard
              key={lecture.id}
              path={`/lecture/${lecture.id}`}
              img={lecture.image}
            >
              {lecture.title}
            </ClassCard>
          ))
        ) : (
          <div className={styles.msg}>수강중인 강의가 없어요.</div>
        )}
      </ClassGrid>
      <ClassGrid title="전체 강의">
        {allClasses.map?.((lecture) => (
          <ClassCard
            key={lecture.id}
            path={`/lecture/${lecture.id}/info`}
            img={lecture.image}
          >
            {lecture.title}
          </ClassCard>
        ))}
      </ClassGrid>
    </MaxWidthLayout>
  );
}
