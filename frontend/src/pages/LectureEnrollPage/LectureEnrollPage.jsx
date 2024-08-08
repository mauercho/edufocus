import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import LectureEnroll from '../../components/LectureEnroll/LectureEnroll';
import { useParams } from 'react-router-dom';
import { useLectureEnroll } from '../../hooks/api/useLectureEnroll';
import { useState, useEffect } from 'react';
import styles from './LectureEnrollPage.module.css';

export default function LectureEnrollPage() {
  const { lectureId } = useParams();
  const { data } = useLectureEnroll(lectureId);
  const [newStudents, setNewStudents] = useState([]);
  const [students, setStudents] = useState([]);
  console.log(data);
  useEffect(() => {
    if (data?.data) {
      setNewStudents(data.data[1]);
      setStudents(data.data[0]);
    }
  }, [data]);

  const handleNewDelete = async (enrollId) => {
    setNewStudents(newStudents.filter((student) => student.id !== enrollId));
  };

  const handleDelete = async (enrollId) => {
    setStudents(students.filter((student) => student.id !== enrollId));
  };

  return (
    <ArticleBoard
      title="수강신청 관리"
      canCreate={false}
    >
      {newStudents.length &&
        newStudents.map?.((student) => (
          <LectureEnroll
            key={`${student.id}`}
            enrollid={student.id}
            userName={student.userName}
            onDelete={handleNewDelete}
            enrolled={false}
          />
        ))}
      <div>
        <h3 className={styles.title}>전체 수강생 관리</h3>
        {students.length &&
          students.map?.((student) => (
            <LectureEnroll
              key={`${student.id}`}
              enrollid={student.id}
              userName={student.userName}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </ArticleBoard>
  );
}

//FIXME: 이 페이지에서 딱 처음 수강신청관리 페이지 들어오면 수강신청 관리용 강의들 안뜨는 문제 있음.
// FIXME: 그리고 왜 그런지는 모르겠는데 강의 목록이 뜨면 HEADER 부분 강의 이름이 안보임.
