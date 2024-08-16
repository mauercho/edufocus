import { QuizsetForm } from '../../components/QuizForm';
import { useQuizsetWrite } from '../../hooks/api/useQuizsetWrite';
import { useNavigate } from 'react-router-dom';

export default function QuizsetWritePage() {
  const navigate = useNavigate();
  const { quizsetWrite } = useQuizsetWrite();

  const handleSubmit = async (e, title, quizzes) => {
    e.preventDefault();

    if (title === '') {
      window.alert('퀴즈 제목이 없는 퀴즈셋은 생성할 수 없습니다');
      return;
    }

    if (quizzes.length === 0) {
      window.alert('퀴즈가 없는 퀴즈셋은 생성할 수 없습니다');
      return;
    }

    const images = [];
    const quizContents = [];

    for (let quiz of quizzes) {
      const { image, question, answer, choices } = quiz;

      if (question === '' || answer === '') {
        window.alert('질문과 정답은 모든 문제에 필수값입니다.');
        return;
      }

      if (choices.length > 0) {
        for (let choice of choices) {
          if (choice.content === '') {
            window.alert('모든 선택지에는 내용이 필요합니다.');
            return;
          }
        }
      }

      images.push(image);
      quizContents.push({ question, answer, choices });
    }

    const quizsetObject = {
      title,
      quizzes: quizContents,
    };

    const formData = new FormData();
    formData.append('quizSetCreateRequest', new Blob([JSON.stringify(quizsetObject)], { type: 'application/json' }));

    images.forEach((imageFile) => {
      if (imageFile) {
        formData.append('images', imageFile);
      } else {
        formData.append('images', new Blob([''], { type: 'image/jpg' }));
      }
    });

    await quizsetWrite(formData);
    navigate('..');
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
