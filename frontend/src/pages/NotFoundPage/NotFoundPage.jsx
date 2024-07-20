import styles from './NotFoundPage.module.css';
import { Footer } from '../../components/Footer';
import { Header } from '../../components/Header';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <div className={styles.body}>
        <div className={styles.notFound}>
          <h1>페이지를 찾을 수 없습니다.</h1>
          <button
            className={styles.goBack}
            onClick={() => window.history.back()}
          >
            이전 페이지로 돌아가기
          </button>
        </div>
        <Footer />
      </div>
    </>
  );
}
