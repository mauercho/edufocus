import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import LectureEnroll from '../../components/LectureEnroll/LectureEnroll';
import { useParams } from 'react-router-dom';
import { useLectureEnroll } from '../../hooks/api/useLectureEnroll';
import { useState, useEffect } from 'react';

export default function QuestionListPage() {
  const { lectureId } = useParams();
  const { data } = useLectureEnroll(lectureId);
  const [lectures, setLectures] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setLectures(data.data);
    }
  }, [data]);

  const handleDelete = async (enrollId) => {
    setLectures(lectures.filter((lecture) => lecture.id !== enrollId));
  };

  return (
    <ArticleBoard
      title="수강신청관리"
      canCreate={false}
    >
      {lectures.length &&
        lectures.map?.((lecture) => (
          <LectureEnroll
            key={`${lecture.id}`}
            enrollid={lecture.id}
            userName={lecture.userName}
            onDelete={handleDelete}
          />
        ))}
    </ArticleBoard>
  );
}

//FIXME: 이 페이지에서 딱 처음 수강신청관리 페이지 들어오면 수강신청 관리용 강의들 안뜨는 문제 있음.
// FIXME: 그리고 왜 그런지는 모르겠는데 강의 목록이 뜨면 HEADER 부분 강의 이름이 안보임.
