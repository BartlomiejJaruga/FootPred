export type PredictResponseDTO = {
  request_id: string;
  home_team: string;
  away_team: string;
  model_name: string;
  confidence: {
    home_team_win: number;
    away_team_win: number;
    draw: number;
  };
};
