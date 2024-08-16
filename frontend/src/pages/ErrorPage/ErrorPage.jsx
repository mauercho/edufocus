import styles from './ErrorPage.module.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

export default function ErrorPage() {
  const [time, setTime] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (time === 0) {
      navigate('/');
    }
  }, [navigate, time]);

  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <div className={styles.contents}>
          <p className={styles.title}>에러가 발생했습니다.</p>
          <p className={styles.msg}>
            <span className={styles.seconds}>{time}초</span> 후에 자동으로 홈으로 이동합니다.
          </p>
          <Link
            to={'/'}
            className={styles.link}
          >
            홈으로 가기
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
