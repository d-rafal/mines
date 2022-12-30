import { WonMessage } from "../../../../../models/gameConfigModel";
import { AppReduxDispatch, AppReduxGetState } from "../../../store";
import { GAME_CONFIG_SLICE_NAME } from "../consts";
import { switchToWon } from "../gameConfigSlice";
import { clearIntervalID } from "../utilities/clearIntervalID";
import { getSerializedGameDifficulty } from "../utilities/getSerializedGameDifficulty";
import { isGameDifficultyInBestResults } from "../utilities/isGameDifficultyInBestResults";
import { isTimeInTopTen } from "../utilities/isTimeInTopTen";

export const switchToWonActionCreator = (
  dispatch: AppReduxDispatch,
  getState: AppReduxGetState
) => {
  clearIntervalID(getState);

  const {
    rowsSize,
    colsSize,
    minesQn,
    gameDuration,
    bestResultsRoster: bestTimes,
  } = getState()[GAME_CONFIG_SLICE_NAME];

  const serializeGameDifficulty = getSerializedGameDifficulty(
    rowsSize,
    colsSize,
    minesQn
  );

  let wonMessageType = WonMessage.Congratulation;

  if (
    !isGameDifficultyInBestResults(serializeGameDifficulty, bestTimes) ||
    isTimeInTopTen(gameDuration, bestTimes[serializeGameDifficulty])
  ) {
    wonMessageType = WonMessage.BestTime;
  }

  dispatch(switchToWon({ changeToWonTime: Date.now(), wonMessageType }));
};
