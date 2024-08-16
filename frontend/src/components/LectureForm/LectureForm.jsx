import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './LectureForm.module.css';
import EditIcon from '/src/assets/icons/edit.svg?react';
import BackIcon from '/src/assets/icons/back.svg?react';

export default function LectureForm({ title, topic, to = '..', initialValues = {}, onSubmit, onCreate = false }) {
  const [lectureTitle, setLectureTitle] = useState('');
  const [description, setDescription] = useState('');
  const [plan, setPlan] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [time, setTime] = useState('');
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (initialValues.title) setLectureTitle(initialValues.title);
    if (initialValues.description) setDescription(initialValues.description);
    if (initialValues.plan) setPlan(initialValues.plan);
    if (initialValues.startDate) setStartDate(new Date(initialValues.startDate).toISOString().split('T')[0]);
    if (initialValues.endDate) setEndDate(new Date(initialValues.endDate).toISOString().split('T')[0]);
    if (initialValues.time) setTime(initialValues.time);
  }, [initialValues]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (start > end) {
      window.alert('시작 날짜가 끝나는 날짜보다 더 늦습니다.');
      return;
    }

    if (start <= new Date(Date.now() - 86400000)) {
      window.alert('시작 날짜는 오늘 이후여야 합니다.');
      return;
    }

    const lectureObject = {
      title: lectureTitle,
      description: description,
      plan: plan,
      startDate: new Date(startDate).toISOString(),
      endDate: new Date(endDate).toISOString(),
      time: time,
    };

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
            value={lectureTitle}
            maxLength={50}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="강의명을 입력하세요"
            required
          />
          {lectureTitle.length > 49 && <div className={styles.textLength}>최대 50글자까지 작성할 수 있습니다.</div>}
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>설명</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
            maxLength={2000}
            placeholder="강의에 대한 설명을 입력하세요"
          ></textarea>
          {description.length > 1999 && <div className={styles.textLength}>최대 2000글자까지 작성할 수 있습니다.</div>}
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>강의 계획</label>
          <textarea
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className={styles.textarea}
            maxLength={2000}
            placeholder="강의 계획을 입력하세요"
          ></textarea>
          {plan.length > 1999 && <div className={styles.textLength}>최대 2000글자까지 작성할 수 있습니다.</div>}
        </div>
        <div className={styles.inputField}>
          <label className={styles.label}>강의 기간</label>
          <div className={styles.dateWrapper}>
            <div className={styles.date}>
              <input
                className={styles.input}
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                type="date"
                required
              />
              <span className={styles.label}>부터</span>
            </div>
            <div className={styles.date}>
              <input
                className={styles.input}
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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
            value={time}
            onChange={(e) => setTime(e.target.value)}
            maxLength={50}
            className={styles.input}
            placeholder="실제 강의 진행 시간을 입력하세요"
          />
          {time.length > 49 && <div className={styles.textLength}>최대 50글자까지 작성할 수 있습니다.</div>}
        </div>
        {onCreate && (
          <div className={styles.inputField}>
            <label className={styles.label}>수업 이미지</label>
            <label className={styles.secondary}>* 여백이 충분히 있고 배경이 투명한 이미지를 사용해 주세요</label>
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
