import { ArticleLink } from '../../components/ArticleLink';
import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';

export default function StudentListPage() {
  const { data: students } = {
    data: [
      { id: 1, name: '학생1', quizScore: 40 },
      { id: 2, name: '학생2', quizScore: 40 },
      { id: 3, name: '학생3', quizScore: 40 },
      { id: 4, name: '학생4', quizScore: 40 },
      { id: 5, name: '이재용', quizScore: 80 },
    ],
  };

  return (
    <ArticleBoard title="수강생 관리">
      {students.map((student) => {
        return (
          <ArticleLink
            key={`${student.name}${student.sub}`}
            title={student.name}
            sub={`퀴즈 점수: ${student.quizScore}`}
            to={`${student.id}`}
          />
        );
      })}
    </ArticleBoard>
  );
}
