import type { PredictResponseDTO } from '@dtos/PredictResponseDTO';
import styles from './PredictionResult.module.scss';

type PredictionResultProps = {
  predictionResults: PredictResponseDTO;
};

export function PredictionResult({ predictionResults }: PredictionResultProps) {
  return (
    <>
      <div className={styles['prediction-results-container']}>
        <h2 className={styles['prediction-results-container__title']}>
          Last Prediction Results
        </h2>

        <div className={styles['prediction-results-container__teams']}>
          <div className={styles['team-container']}>
            <h3 className={styles['team-container__label']}>Home Team</h3>
            <span className={styles['team-container__name']}>
              {predictionResults.home_team}
            </span>
          </div>

          <span className={styles['versus-text']}>VS</span>

          <div className={styles['team-container']}>
            <h3 className={styles['team-container__label']}>Away Team</h3>
            <span className={styles['team-container__name']}>
              {predictionResults.away_team}
            </span>
          </div>
        </div>

        <h2
          className={styles['prediction-results-container__winner']}
        >{`Winner: ${predictionResults.winner}`}</h2>
      </div>
    </>
  );
}
