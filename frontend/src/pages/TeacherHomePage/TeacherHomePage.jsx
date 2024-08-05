import { ClassCard } from '../../components/ClassCard';
import { ClassGrid } from '../../components/ClassGrid';
import { MaxWidthLayout } from '../../components/Layout';
import { useMyLectures } from '../../hooks/api/useMyLectures';

export default function TeacherHomePage() {
  const { data: myLectures } = useMyLectures();
  const onGoingClasses = myLectures?.data ?? [];
  console.log(onGoingClasses);
  // TODO: 새 강의 만들기 스타일 추가, 추가 기능 필요시 추가
  return (
    <MaxWidthLayout>
      <ClassGrid title="내 강의">
        {onGoingClasses.map?.((lecture) => (
          <ClassCard
            key={lecture.id}
            path={`/lecture/${lecture.id}`}
            img={lecture.image}
          >
            {lecture.title}
          </ClassCard>
        ))}
        <ClassCard path={'/lecture/create'}>새 강의 만들기</ClassCard>
      </ClassGrid>
    </MaxWidthLayout>
  );
}
