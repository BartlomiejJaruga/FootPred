import type { PredictResponseDTO } from '@dtos/PredictResponseDTO';
import styles from './PredictionResult.module.scss';
import clsx from 'clsx';

type PredictionResultProps = {
  predictionResults: PredictResponseDTO;
};

export function PredictionResult({ predictionResults }: PredictionResultProps) {
  const homeTeamWinPercent = Math.round(
    predictionResults.confidence.home_team_win * 100
  );
  const awayTeamWinPercent = Math.round(
    predictionResults.confidence.away_team_win * 100
  );
  const drawPercent = Math.round(predictionResults.confidence.draw * 100);
  const mostLikelyWinner =
    homeTeamWinPercent >= awayTeamWinPercent
      ? homeTeamWinPercent >= drawPercent
        ? predictionResults.home_team
        : 'Draw'
      : predictionResults.away_team;

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

        <PredictionHorizontalBar
          homeTeamWinPercent={homeTeamWinPercent}
          awayTeamWinPercent={awayTeamWinPercent}
          drawPercent={drawPercent}
        />

        <h2
          className={styles['prediction-results-container__winner']}
        >{`Most likely winner: ${mostLikelyWinner}`}</h2>
      </div>
    </>
  );
}

type PredictionHorizontalBarProps = {
  homeTeamWinPercent: number;
  awayTeamWinPercent: number;
  drawPercent: number;
};

function PredictionHorizontalBar({
  homeTeamWinPercent,
  awayTeamWinPercent,
  drawPercent,
}: PredictionHorizontalBarProps) {
  const isHomeLikelyWinner = homeTeamWinPercent >= awayTeamWinPercent;

  return (
    <div className={styles['prediction-horizontal-bar']}>
      <div
        className={clsx(
          styles['bar'],
          styles['bar--home-team'],
          isHomeLikelyWinner && styles['bar--winner']
        )}
        style={{ width: `${homeTeamWinPercent}%` }}
      >
        {`${homeTeamWinPercent}%`}
      </div>
      {drawPercent > 0 && (
        <div
          className={clsx(styles['bar'], styles['bar--draw'])}
          style={{ width: `${drawPercent}%` }}
        >
          {`${drawPercent}%`}
        </div>
      )}
      <div
        className={clsx(
          styles['bar'],
          styles['bar--away-team'],
          !isHomeLikelyWinner && styles['bar--winner']
        )}
        style={{ width: `${awayTeamWinPercent}%` }}
      >
        {`${awayTeamWinPercent}%`}
      </div>
    </div>
  );
}
