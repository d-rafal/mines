import { AppReduxDispatch, AppReduxGetState } from "../../../store";
import { switchToActiveActionCreator } from "../../game-config/action-creators/switchToActiveActionCreator";
import { GAME_CONFIG_SLICE_NAME } from "../../game-config/consts";
import { hideWelcomeDialog } from "../showElementsSlice";

export const hideWelcomeDialogActionCreator = (
  dispatch: AppReduxDispatch,
  getState: AppReduxGetState
) => {
  const { pausedByPauseBtn, status } = getState()[GAME_CONFIG_SLICE_NAME];

  if (status === "paused" && !pausedByPauseBtn) {
    dispatch(switchToActiveActionCreator);
  }

  dispatch(hideWelcomeDialog());
};
