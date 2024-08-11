import { QuizsetForm } from '../../components/QuizForm';
import { useQuizsetWrite } from '../../hooks/api/useQuizsetWrite';
import { useNavigate } from 'react-router-dom';

export default function QuizsetWritePage() {
  const navigate = useNavigate();
  const { quizsetWrite } = useQuizsetWrite();

  const handleSubmit = async (e, title, quizzes) => {
    e.preventDefault();
    if (quizzes.length === 0) {
      window.alert('퀴즈가 없는 퀴즈셋은 생성할 수 없습니다');
      return;
    }

    const images = [];
    const quizContents = [];

    quizzes.forEach((quiz) => {
      // eslint-disable-next-line no-unused-vars
      const { image, question, answer, choices } = quiz;
      images.push(image);
      quizContents.push({ question, answer, choices });
    });

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
