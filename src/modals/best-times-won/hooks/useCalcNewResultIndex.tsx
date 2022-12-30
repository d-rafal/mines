import { useMemo } from "react";
import { GameConfig, MAX_BEST_TIMES } from "../../../models/gameConfigModel";

const useCalcNewResultIndex = (
  gameDuration: GameConfig["gameDuration"],
  bestResults: GameConfig["bestResultsRoster"][string] | undefined
) => {
  return useMemo(() => {
    if (!bestResults) {
      return 0;
    }

    const newResultIndex = bestResults.findIndex(
      (result) => gameDuration < result.time
    );

    if (newResultIndex !== -1) {
      return newResultIndex;
    }

    if (newResultIndex === -1 && bestResults.length < MAX_BEST_TIMES) {
      return bestResults.length;
    }

    return -1;
  }, [gameDuration, bestResults]);
};

export default useCalcNewResultIndex;
