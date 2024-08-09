import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './LectureForm.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';

export default function LectureForm({ title, topic, to = '..', initialValues = {}, onSubmit, onCreate = false }) {
  // TODO: 디자인 필요, 필요시 useState로 수정하고 버튼 비활성화 기능 추가
  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const planRef = useRef('');
  const startDateRef = useRef('');
  const endDateRef = useRef('');
  const timeRef = useRef('');
  const imageFileRef = useRef(null);

  // 초기 값 설정
  useEffect(() => {
    if (initialValues.title) titleRef.current.value = initialValues.title;
    if (initialValues.description) descriptionRef.current.value = initialValues.description;
    if (initialValues.plan) planRef.current.value = initialValues.plan;
    if (initialValues.startDate)
      startDateRef.current.value = new Date(initialValues.startDate).toISOString().split('T')[0];
    if (initialValues.endDate) endDateRef.current.value = new Date(initialValues.endDate).toISOString().split('T')[0];
    if (initialValues.time) timeRef.current.value = initialValues.time;
  }, [initialValues]);

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

    const imageFile = (imageFileRef.current && imageFileRef.current.files[0]) ?? null;
    if (imageFile) {
      formData.append('image', imageFile);
    }

    onSubmit(lectureObject, imageFile);
  };

  return (
    <div className={styles.createClass}>
      <header className={styles.header}>
        <Link
          to={to}
          className={styles.goBack}
        >
          <BackIcon />
          <span>{title}</span>
        </Link>
        <div className={styles.title}>{topic}</div>
      </header>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputField}>
          <label className={styles.label}>강의명</label>
          <input
            className={styles.input}
            ref={titleRef}
            maxLength={200}
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
            maxLength={200}
            className={styles.input}
            placeholder="실제 강의 진행 시간을 입력하세요"
          />
        </div>
        {onCreate && (
          <div className={styles.inputField}>
            <label className={styles.label}>수업 이미지</label>
            <input
              type="file"
              ref={imageFileRef}
              accept=".png, .jpg, .jpeg"
            />
          </div>
        )}
        <button
          type="submit"
          className={styles.button}
        >
          <EditIcon />
          <div>제출</div>
        </button>
      </form>
    </div>
  );
}
