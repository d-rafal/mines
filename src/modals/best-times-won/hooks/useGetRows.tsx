import { useMemo } from "react";
import BestResultRow from "../../../components/best-result-row/BestResultRow";
import { GameConfig, MAX_BEST_TIMES } from "../../../models/gameConfigModel";

const useGetRows = (
  gameDuration: GameConfig["gameDuration"],
  bestResults: GameConfig["bestResultsRoster"][string] | undefined,
  newResultIndex: number
) => {
  return useMemo(() => {
    const bestResultsShallowCopy = bestResults ? [...bestResults] : [];

    bestResultsShallowCopy.splice(
      newResultIndex,
      bestResultsShallowCopy.length < MAX_BEST_TIMES ? 0 : 1,
      {
        time: gameDuration,
        player: null,
      }
    );

    return bestResultsShallowCopy.map((result, index) => (
      <BestResultRow
        bestTime={result}
        key={index}
        index={index}
        isEditAble={index === newResultIndex ? true : false}
      />
    ));
  }, [gameDuration, bestResults, newResultIndex]);
};

export default useGetRows;
