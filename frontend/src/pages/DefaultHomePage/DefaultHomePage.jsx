import { ClassCard } from '../../components/ClassCard';
import { ClassGrid } from '../../components/ClassGrid';
import { MaxWidthLayout } from '../../components/Layout';
import { useLectures } from '../../hooks/api/useLectures';

export default function StudentHomePage() {
  const { data: allLectures } = useLectures();
  const allClasses = allLectures?.data ?? [];
  console.log(allClasses);

  return (
    <MaxWidthLayout>
      <ClassGrid title="전체 강의">
        {allClasses.map?.((lecture) => (
          <ClassCard
            key={lecture.id}
            path={`/lecture/${lecture.id}`}
            img={lecture.image}
          >
            {lecture.title}
          </ClassCard>
        ))}
      </ClassGrid>
    </MaxWidthLayout>
  );
}
