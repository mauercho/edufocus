import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LectureForm.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';

export default function LectureForm({ title, topic, to = '..', initialValues = {}, onSubmit, onCreate = false }) {
  // TODO: 디자인 필요, 필요시 useState로 수정하고 버튼 비활성화 기능 추가 및 이미지 파일 입력 처리
  const titleRef = useRef('');
  const descriptionRef = useRef('');
  const planRef = useRef('');
  const startDateRef = useRef('');
  const endDateRef = useRef('');
  const timeRef = useRef('');
  const [imageFile, setImageFile] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    if (file.type.startsWith('image/')) {
      setImageFile(file);
      return;
    }
    alert('이미지 파일만 업로드 해주세요');
    event.target.value = null;
  };

  useEffect(() => {
    if (initialValues.title) titleRef.current.value = initialValues.title;
    if (initialValues.description) descriptionRef.current.value = initialValues.description;
    if (initialValues.plan) planRef.current.value = initialValues.plan;
    if (initialValues.startDate)
      startDateRef.current.value = new Date(initialValues.startDate).toISOString().split('T')[0];
    if (initialValues.endDate) endDateRef.current.value = new Date(initialValues.endDate).toISOString().split('T')[0];
    if (initialValues.time) timeRef.current.value = initialValues.time;
  }, [initialValues]);

  console.log(startDateRef.current.value, endDateRef.current.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const startDate = new Date(startDateRef.current.value);
    const endDate = new Date(endDateRef.current.value);
    if (startDate > endDate) {
      window.alert('시작 날짜가 끝나는 날짜보다 더 늦습니다.');
      return;
    }

    if (startDate <= new Date(Date.now() - 86400000)) {
      window.alert('시작 날짜는 오늘 이후여야 합니다.');
      return;
    }

    const lectureObject = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      plan: planRef.current.value,
      startDate: new Date(startDateRef.current.value).toISOString(),
      endDate: new Date(endDateRef.current.value).toISOString(),
      time: timeRef.current.value,
    };
    console.log(lectureObject);
    const formData = new FormData();
    formData.append('lectureCreateRequest', new Blob([JSON.stringify(lectureObject)], { type: 'application/json' }));

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
      <form
        onSubmit={handleSubmit}
        className={styles.form}
      >
        <div className={styles.inputField}>
          <label className={styles.label}>강의명</label>
          <input
            className={styles.input}
            ref={titleRef}
            maxLength={50}
            type="text"
            placeholder="강의명을 입력하세요"
            required
          />
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>설명</label>
          <textarea
            ref={descriptionRef}
            className={styles.textarea}
            maxLength={2000}
            placeholder="강의에 대한 설명을 입력하세요"
          ></textarea>
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>강의 계획</label>
          <textarea
            ref={planRef}
            className={styles.textarea}
            maxLength={2000}
            placeholder="강의 계획을 입력하세요"
          ></textarea>
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>강의 기간</label>
          <div className={styles.dateWrapper}>
            <div className={styles.date}>
              <input
                className={styles.input}
                ref={startDateRef}
                type="date"
                required
              />
              <span className={styles.label}>부터</span>
            </div>
            <div className={styles.date}>
              <input
                className={styles.input}
                ref={endDateRef}
                type="date"
                required
              />
              <span className={styles.label}>까지</span>
            </div>
          </div>
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>수업 시간</label>
          <input
            type="text"
            ref={timeRef}
            maxLength={50}
            className={styles.input}
            placeholder="실제 강의 진행 시간을 입력하세요"
          />
        </div>
        {onCreate && (
          <div className={styles.inputField}>
            <label className={styles.label}>수업 이미지</label>
            <input
              type="file"
              accept="image/*"
              className={styles.input}
              onChange={handleImageChange}
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
