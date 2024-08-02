import { QuizsetForm } from '../../components/QuizForm';
import { useQuizsetWrite } from '../../hooks/api/useQuizsetWrite';

export default function QuizsetWritePage() {
  // TODO: lecture에서 이미지 전송 성공 후 해당 방법으로 이미지 파일 입력
  const { quizsetWrite } = useQuizsetWrite();
  const handleSubmit = async (e, title, quizzes, imageFile = null) => {
    e.preventDefault();
    const quizsetObject = {
      title,
      quizzes,
    };
    console.log(quizsetObject);
    console.log(imageFile);

    const formData = new FormData();
    formData.append('quizSetCreateRequest', new Blob([JSON.stringify(quizsetObject)], { type: 'application/json' }));
    if (imageFile) {
      formData.append('image', imageFile);
    }
    const response = await quizsetWrite(formData);
    console.log(response);
  };
  return (
    <QuizsetForm
      onSubmit={handleSubmit}
      headerTitle={'퀴즈 목록'}
      topic={'퀴즈 작성'}
      to={'..'}
    />
  );
}
