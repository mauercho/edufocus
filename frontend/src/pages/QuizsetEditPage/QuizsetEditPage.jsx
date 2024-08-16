import { QuizsetForm } from '../../components/QuizForm';
import { useQuizsetEdit } from '../../hooks/api/useQuizsetEdit';
import { useNavigate, useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function QuizsetEditPage() {
  const { quizsetId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const initialValue = location.state.initialValue;
  const { quizsetEdit } = useQuizsetEdit();
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
      id: quizsetId,
      title,
      quizzes: quizContents,
    };
    const formData = new FormData();
    formData.append('quizSetUpdateRequest', new Blob([JSON.stringify(quizsetObject)], { type: 'application/json' }));

    images.forEach((imageFile) => {
      if (imageFile && !(typeof imageFile === 'string')) {
        formData.append('images', imageFile);
      } else {
        formData.append('images', new Blob([''], { type: 'image/jpg' }));
      }
    });

    await quizsetEdit(formData);
    navigate('..');
  };

  return (
    <QuizsetForm
      initialValue={initialValue}
      onSubmit={handleSubmit}
      headerTitle={initialValue.title}
      topic={'퀴즈 수정'}
      to={'..'}
    />
  );
}
