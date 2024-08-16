import ArticleBoard from '../../components/ArticleBoard/ArticleBoard';
import LectureEnroll from '../../components/LectureEnroll/LectureEnroll';
import { useParams } from 'react-router-dom';
import { useLectureEnroll } from '../../hooks/api/useLectureEnroll';
import { useState, useEffect } from 'react';
import styles from './LectureEnrollPage.module.css';

export default function LectureEnrollPage() {
  const { lectureId } = useParams();
  const { data, refetch } = useLectureEnroll(lectureId);
  const [newStudents, setNewStudents] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if (data?.data) {
      setNewStudents(data.data[1]);
      setStudents(data.data[0]);
    }
  }, [data]);

  const handleNewDelete = async (enrollId) => {
    setNewStudents(newStudents.filter((student) => student.id !== enrollId));
    refetch();
  };

  const handleDelete = async (enrollId) => {
    setStudents(students.filter((student) => student.id !== enrollId));
  };

  return (
    <ArticleBoard
      title="수강신청 관리"
      canCreate={false}
    >
      {newStudents.length > 0 ? (
        newStudents.map?.((student) => (
          <LectureEnroll
            key={`${student.id}`}
            enrollid={student.id}
            userName={student.userName}
            onDelete={handleNewDelete}
            enrolled={false}
          />
        ))
      ) : (
        <div className={styles.emptyMessage}>수강 대기중인 학생이 없어요</div>
      )}
      <div>
        <h3 className={styles.title}>전체 수강생 관리</h3>
        {students.length > 0 ? (
          students.map?.((student) => (
            <LectureEnroll
              key={`${student.id}`}
              enrollid={student.id}
              userName={student.userName}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className={styles.emptyMessage}>현재 수강생이 없어요</div>
        )}
      </div>
    </ArticleBoard>
  );
}
