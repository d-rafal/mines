import { AppReduxDispatch, AppReduxGetState } from "../../../store";
import { switchToPausedActionCreator } from "../../game-config/action-creators/switchToPausedActionCreator";
import { GAME_CONFIG_SLICE_NAME } from "../../game-config/consts";
import { showBestResults } from "../showElementsSlice";

export const showBestResultsActionCreator = (
  dispatch: AppReduxDispatch,
  getState: AppReduxGetState
) => {
  const { status } = getState()[GAME_CONFIG_SLICE_NAME];

  if (status === "active") {
    dispatch(switchToPausedActionCreator({ byPauseBtn: false }));
  }

  dispatch(showBestResults());
};
