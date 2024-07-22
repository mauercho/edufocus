import { ClassCard } from '../../components/ClassCard';
import { ClassGrid } from '../../components/ClassGrid';
import { MaxWidthLayout } from '../../components/Layout';

export default function StudentHomePage() {
  const { data: onGoingClasses } = {
    data: [
      { lecture_id: 1, title: '한국어' },
      { lecture_id: 2, title: '영어' },
      { lecture_id: 3, title: '일본어' },
    ],
  };

  const { data: allClasses } = {
    data: [
      { lecture_id: 1, title: '한국어' },
      { lecture_id: 2, title: '영어' },
      { lecture_id: 3, title: '일본어' },
      { lecture_id: 4, title: '중국어' },
      { lecture_id: 5, title: '프랑스어' },
      { lecture_id: 6, title: '스페인어' },
    ],
  };

  return (
    <MaxWidthLayout>
      <ClassGrid title="수강중인 강의">
        {onGoingClasses.map((lecture) => (
          <ClassCard
            key={lecture.lecture_id}
            path={`/lecture/${lecture.lecture_id}`}
          >
            {lecture.title}
          </ClassCard>
        ))}
      </ClassGrid>
      <ClassGrid title="전체 강의">
        {allClasses.map((lecture) => (
          <ClassCard
            key={lecture.lecture_id}
            path={`/class/${lecture.lecture_id}`}
          >
            {lecture.title}
          </ClassCard>
        ))}
      </ClassGrid>
    </MaxWidthLayout>
  );
}
