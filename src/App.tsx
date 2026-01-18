import { FootballTeamsForm } from '@components/FootballTeamsForm';
import { PredictionResult } from '@components/PredictionResult';
import styles from '@styles/app.module.scss';

export default function App() {
  return (
    <div className={styles['app']}>
      <h1 className={styles['website-title']}>Football Predict</h1>
      <FootballTeamsForm />
      <PredictionResult />
    </div>
  );
}
