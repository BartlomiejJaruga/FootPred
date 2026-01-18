import { FootballTeamSelect } from '@components/FootballTeamSelect';
import styles from './FootballTeamsForm.module.scss';
import type { TeamsListResponseDTO } from '@dtos/TeamsListResponseDTO';
import { useEffect, useState } from 'react';
import { sortListAlphabetically } from '@lib/utils';
import axiosInstance from '@services/axiosInstance';
import type { PredictResponseDTO } from '@dtos/PredictResponseDTO';
import { LoadingIndicator } from '@components/LoadingIndicator';

type FootballTeamsFormProps = {
  setPredictResults: (predictResults: PredictResponseDTO | null) => void;
};

export function FootballTeamsForm({
  setPredictResults,
}: FootballTeamsFormProps) {
  const [teamList, setTeamList] = useState<string[]>([]);
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');
  const [isPredicting, setIsPredicting] = useState<boolean>(false);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await axiosInstance.get('/v1/teams');

        const teams = response.data as TeamsListResponseDTO;

        const sortedTeams = sortListAlphabetically(teams.teams_list || []);
        setTeamList(sortedTeams);
      } catch (error) {
        console.error(error);
      }
    };

    loadTeams();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!homeTeam || !awayTeam) {
      alert('Please select both teams!');
      return;
    }

    if (homeTeam == awayTeam) {
      alert('A team cannot play against itself!');
      return;
    }

    try {
      setIsPredicting(true);

      const response = await axiosInstance.post('/v1/predict', {
        home_team: homeTeam,
        away_team: awayTeam,
      });

      setPredictResults(response.data);
      setIsPredicting(false);
    } catch (error) {
      console.error(error);
      setPredictResults(null);
      setIsPredicting(false);
    }
  };

  return (
    <>
      <form className={styles['football-teams-form']} onSubmit={handleSubmit}>
        <div className={styles['football-teams-form__teams-selection']}>
          <div className={styles['team-select-container']}>
            <h3>Home Team</h3>
            <FootballTeamSelect teamList={teamList} onSelect={setHomeTeam} />
          </div>

          <span className={styles['versus-text']}>VS</span>

          <div className={styles['team-select-container']}>
            <h3>Away Team</h3>
            <FootballTeamSelect teamList={teamList} onSelect={setAwayTeam} />
          </div>
        </div>

        {isPredicting && (
          <LoadingIndicator
            message="Predicting results... this can take up to a few minutes"
            fontSize="1rem"
          />
        )}

        {!isPredicting && (
          <button
            type="submit"
            className={styles['football-teams-form__submit']}
          >
            PREDICT
          </button>
        )}
      </form>
    </>
  );
}
