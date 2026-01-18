import { FootballTeamsForm } from '@components/FootballTeamsForm';
import { PredictionResult } from '@components/PredictionResult';
import type { PredictResponseDTO } from '@dtos/PredictResponseDTO';
import styles from '@styles/app.module.scss';
import { useState } from 'react';

export default function App() {
  const [predictionResults, setPredictionsResults] =
    useState<PredictResponseDTO | null>(null);

  const handleSetPredictionResults = (
    predictionResults: PredictResponseDTO | null
  ) => {
    setPredictionsResults(predictionResults);
  };

  return (
    <div className={styles['app']}>
      <div className={styles['website-title-container']}>
        <h1>GoalCast</h1>
        <h2>(Football matches prediction AI)</h2>
      </div>

      <FootballTeamsForm setPredictResults={handleSetPredictionResults} />

      {predictionResults && (
        <PredictionResult predictionResults={predictionResults} />
      )}
    </div>
  );
}
