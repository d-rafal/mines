import {
  GameConfig,
  MAX_BEST_TIMES,
} from "../../../../../models/gameConfigModel";

export const isTimeInTopTen = (
  gameDuration: GameConfig["gameDuration"],
  bestResults: GameConfig["bestResultsRoster"][string]
) => {
  if (bestResults.length < MAX_BEST_TIMES) {
    return true;
  }

  if (gameDuration < bestResults[MAX_BEST_TIMES - 1].time) {
    return true;
  }

  return false;
};
