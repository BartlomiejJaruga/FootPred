import { FootballTeamSelect } from '@components/FootballTeamSelect';
import styles from './FootballTeamsForm.module.scss';
import type { TeamsListResponseDTO } from '@dtos/TeamsListResponseDTO';

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
  return (
    <>
      <div className={styles['football-teams-form']}>
        <div className={styles['team-select-container']}>
          <h3>Home Team</h3>
          <FootballTeamSelect teamList={TEAMS.teams_list} />
        </div>

        <span className={styles['versus-text']}>VS</span>

        <div className={styles['team-select-container']}>
          <h3>Away Team</h3>
          <FootballTeamSelect teamList={TEAMS.teams_list} />
        </div>
      </div>
    </>
  );
}
