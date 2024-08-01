import styles from './LectureCreatePage.module.css';
import { useRef } from 'react';
import { useLectureCreate } from '../../hooks/api/useLectureCreate';

export default function LectureCreatePage() {
  // TODO: 디자인 필요
  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const planRef = useRef('');
  const startDateRef = useRef('');
  const endDateRef = useRef('');
  const timeRef = useRef(null);
  const imageFileRef = useRef('');

  const { lectureCreate } = useLectureCreate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const lectureObject = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      plan: planRef.current.value,
      startDate: new Date(startDateRef.current.value).toISOString(),
      endDate: new Date(endDateRef.current.value).toISOString(),
      time: timeRef.current.value,
    };

    const formData = new FormData();

    formData.append('lectureCreateRequest', new Blob([JSON.stringify(lectureObject)], { type: 'application/json' }));

    const imageFile = imageFileRef.current.files[0] ?? null;
    if (imageFile) {
      formData.append('image', imageFile);
    }

    const response = await lectureCreate(formData);
    console.log(response?.data);
  };

  return (
    <form
      className={styles.createClass}
      onSubmit={handleSubmit}
    >
      <div className={styles.inputField}>
        <label className={styles.label}>강의명</label>
        <input
          className={styles.input}
          ref={titleRef}
          type="text"
          placeholder="강의명을 입력하세요"
        />
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>설명</label>
        <textarea
          ref={descriptionRef}
          className={styles.textarea}
          placeholder="강의에 대한 설명을 입력하세요"
        ></textarea>
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>강의 계획</label>
        <textarea
          ref={planRef}
          className={styles.textarea}
          placeholder="강의 계획을 입력하세요"
        ></textarea>
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>강의 기간</label>
        <input
          className={styles.input}
          ref={startDateRef}
          type="date"
        />
        <input
          className={styles.input}
          ref={endDateRef}
          type="date"
        />
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>수업 시간</label>
        <input
          type="text"
          ref={timeRef}
          className={styles.input}
          placeholder="실제 강의 진행 시간을 입력하세요"
        ></input>
      </div>
      <div className={styles.inputField}>
        <label className={styles.label}>수업 이미지</label>
        <input
          type="file"
          ref={imageFileRef}
          accept=""
        />
      </div>
      <button
        type="submit"
        className={styles.button}
      >
        <div>ㅁ</div>
        <div className={styles.buttonText}>강의 생성</div>
      </button>
    </form>
  );
}
