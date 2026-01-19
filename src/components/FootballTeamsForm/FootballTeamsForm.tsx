import { FootballTeamSelect } from '@components/FootballTeamSelect';
import styles from './FootballTeamsForm.module.scss';
import type { TeamsListResponseDTO } from '@dtos/TeamsListResponseDTO';
import { useEffect, useState } from 'react';
import { sortListAlphabetically } from '@lib/utils';
import axiosInstance from '@services/axiosInstance';
import type { PredictResponseDTO } from '@dtos/PredictResponseDTO';
import { LoadingIndicator } from '@components/LoadingIndicator';
import type { GetAvailableModelsResponseDTO } from '@dtos/GetAvailableModelsResponseDTO';
import { PredictionModelSelect } from '@components/PredictionModelSelect';

type FootballTeamsFormProps = {
  setPredictResults: (predictResults: PredictResponseDTO | null) => void;
};

export function FootballTeamsForm({
  setPredictResults,
}: FootballTeamsFormProps) {
  const [teamList, setTeamList] = useState<string[]>([]);
  const [modelsList, setModelsList] = useState<string[]>([]);
  const [homeTeam, setHomeTeam] = useState<string>('');
  const [awayTeam, setAwayTeam] = useState<string>('');
  const [predictionModel, setPredictionModel] = useState<string>('');
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

    const loadModels = async () => {
      try {
        const response = await axiosInstance.get('/v1/models');

        const models = response.data as GetAvailableModelsResponseDTO;
        setModelsList(models.models_list);
      } catch (error) {
        console.error(error);
        setModelsList([]);
      }
    };

    loadTeams();
    loadModels();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!homeTeam || !awayTeam || !predictionModel) {
      alert('Please select both teams and prediction model!');
      return;
    }

    if (homeTeam != 'Random Team' && homeTeam == awayTeam) {
      alert('A team cannot play against itself!');
      return;
    }

    try {
      setIsPredicting(true);

      const requestBody = {
        home_team: homeTeam === 'Random Team' ? null : homeTeam,
        away_team: awayTeam === 'Random Team' ? null : awayTeam,
        model_name:
          predictionModel === 'Random Prediction Model'
            ? null
            : predictionModel,
      };

      const response = await axiosInstance.post('/v1/predict', requestBody);

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

        <PredictionModelSelect
          modelList={modelsList}
          onModelSelect={setPredictionModel}
        />

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
