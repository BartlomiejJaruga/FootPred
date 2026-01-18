import { FootballTeamSelect } from '@components/FootballTeamSelect';
import styles from './FootballTeamsForm.module.scss';
import type { TeamsListResponseDTO } from '@dtos/TeamsListResponseDTO';
import { useEffect, useState } from 'react';
import { sortListAlphabetically } from '@lib/utils';
import axiosInstance from '@services/axiosInstance';

export function FootballTeamsForm() {
  const [teamList, setTeamList] = useState<string[]>([]);
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!homeTeam || !awayTeam) {
      alert('Please select both teams!');
      return;
    }

    if (homeTeam == awayTeam) {
      alert('A team cannot play against itself!');
      return;
    }

    console.log('--- Prediction Request ---');
    console.log('Home Team:', homeTeam);
    console.log('Away Team:', awayTeam);
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

        <button type="submit" className={styles['football-teams-form__submit']}>
          PREDICT
        </button>
      </form>
    </>
  );
}
