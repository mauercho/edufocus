import { ClassCard } from '../../components/ClassCard';
import { ClassGrid } from '../../components/ClassGrid';

export default function LearningLecturesPage() {
  const { data: onGoingClasses } = {
    data: [
      { lecture_id: 1, title: '한국어' },
      { lecture_id: 2, title: '영어' },
      { lecture_id: 3, title: '일본어' },
    ],
  };

  return (
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
  );
}
