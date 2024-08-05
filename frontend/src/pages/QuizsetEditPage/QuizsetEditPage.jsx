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
  console.log(initialValue);
  const handleSubmit = async (e, title, quizzes) => {
    e.preventDefault();

    const images = [];
    const quizContents = [];
    quizzes.forEach((quiz) => {
      const { image, ...quizData } = quiz;
      images.push(image);
      if (quizData.id > initialValue.quizzes[initialValue.quizzes.length - 1].id) {
        const { question, answer, choices } = quizData;
        quizContents.push({ question, answer, choices });
      } else {
        quizContents.push(quizData);
      }
    });

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

    formData.forEach((value, key) => {
      console.log(`FormData - Key: ${key}, Value:`, value);
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
