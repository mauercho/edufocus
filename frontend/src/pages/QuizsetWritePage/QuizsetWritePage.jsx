import { QuizsetForm } from '../../components/QuizForm';
import { useQuizsetWrite } from '../../hooks/api/useQuizsetWrite';

export default function QuizsetWritePage() {
  // TODO: lecture에서 이미지 전송 성공 후 해당 방법으로 이미지 파일 입력
  const { quizsetWrite } = useQuizsetWrite();
  const handleSubmit = async (e, title, quizzes) => {
    e.preventDefault();
    console.log(title, quizzes);
    const quizsetObject = {
      title,
      quizzes,
    };

    const formData = new FormData();
    formData.append('quizSetCreateRequest', new Blob([JSON.stringify(quizsetObject)], { type: 'application/json' }));

    const response = await quizsetWrite(formData);
    console.log(response);
  };
  return (
    <div>
      <div>퀴즈 쓰기</div>
      <QuizsetForm onSubmit={handleSubmit} />
      <div>
        <label>퀴즈 이미지</label>
        <input
          type="file"
          accept=".png, .jpg, .jpeg"
        />
      </div>
    </div>
  );
}
