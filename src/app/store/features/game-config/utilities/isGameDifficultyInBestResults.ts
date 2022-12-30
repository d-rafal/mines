import { GameConfig } from "../../../../../models/gameConfigModel";

export const isGameDifficultyInBestResults = (
  serializeGameDifficulty: string,
  bestResultsRoster: GameConfig["bestResultsRoster"]
) => {
  return bestResultsRoster[serializeGameDifficulty] !== undefined;
};
