import { FootballTeamSelect } from '@components/FootballTeamSelect';
import styles from './FootballTeamsForm.module.scss';
import type { TeamsListResponseDTO } from '@dtos/TeamsListResponseDTO';
import { useEffect, useState } from 'react';
import { sortListAlphabetically } from '@lib/utils';

const TEAMS: TeamsListResponseDTO = {
  teams_list: [
    'England',
    'Poland',
    'Germany',
    'Italy',
    'France',
    'Spain',
    'Russia',
  ],
};

export function FootballTeamsForm() {
  const [teamList, setTeamList] = useState<string[]>([]);

  useEffect(() => {
    const sortedTeams = sortListAlphabetically(TEAMS.teams_list);
    setTeamList(sortedTeams);
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
