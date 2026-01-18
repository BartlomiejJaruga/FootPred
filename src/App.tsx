import { FootballTeamsForm } from '@components/FootballTeamsForm';
import { PredictionResult } from '@components/PredictionResult';
import styles from '@styles/app.module.scss';

export default function App() {
  return (
    <div className={styles['app']}>
      <div className={styles['website-title-container']}>
        <h1>GoalCast</h1>
        <h2>(Football matches prediction AI)</h2>
      </div>

      <FootballTeamsForm />

      <PredictionResult />
    </div>
  );
}
