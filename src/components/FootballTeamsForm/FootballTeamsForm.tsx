import { FootballTeamSelect } from '@components/FootballTeamSelect';
import styles from './FootballTeamsForm.module.scss';
import type { TeamsListResponseDTO } from '@dtos/TeamsListResponseDTO';
import { useEffect, useState } from 'react';
import { sortListAlphabetically } from '@lib/utils';
import axiosInstance from '@services/axiosInstance';

export function FootballTeamsForm() {
  const [teamList, setTeamList] = useState<string[]>([]);

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

  return (
    <>
      <div className={styles['football-teams-form']}>
        <div className={styles['team-select-container']}>
          <h3>Home Team</h3>
          <FootballTeamSelect teamList={teamList} />
        </div>

        <span className={styles['versus-text']}>VS</span>

        <div className={styles['team-select-container']}>
          <h3>Away Team</h3>
          <FootballTeamSelect teamList={teamList} />
        </div>
      </div>
    </>
  );
}
