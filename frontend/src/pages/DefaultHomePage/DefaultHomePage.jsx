import { ClassCard } from '../../components/ClassCard';
import { ClassGrid } from '../../components/ClassGrid';
import { MaxWidthLayout } from '../../components/Layout';
import { useLectures } from '../../hooks/api/useLectures';

export default function StudentHomePage() {
  const { data: allLectures } = useLectures();
  const allClasses = allLectures?.data ?? [];

  return (
    <MaxWidthLayout>
      <ClassGrid title="전체 강의">
        {allClasses.map?.((lecture) => (
          <ClassCard
            key={lecture.id}
            path={`/lecture/${lecture.id}/info`}
          >
            {lecture.title}
          </ClassCard>
        ))}
      </ClassGrid>
    </MaxWidthLayout>
  );
}
