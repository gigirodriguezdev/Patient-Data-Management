import { PatientsPage } from '@/pages/PatientsPage/PatientsPage';
import styles from '@/App.module.css';
import '@/App.css';

function App() {
  return (
    <>
      <div className={styles.bgLayer} aria-hidden>
        <span className={styles.blob1} />
        <span className={styles.blob2} />
        <span className={styles.blob3} />
        <span className={styles.blob4} />
      </div>
      <main className={styles.main}>
        <PatientsPage />
      </main>
    </>
  );
}

export default App;
