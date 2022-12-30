import { AppReduxDispatch, AppReduxGetState } from "../../../store";
import { switchToActiveActionCreator } from "../action-creators/switchToActiveActionCreator";
import { GAME_CONFIG_SLICE_NAME } from "../consts";

export const switchToActiveState = (
  dispatch: AppReduxDispatch,
  getState: AppReduxGetState
) => {
  const { status } = getState()[GAME_CONFIG_SLICE_NAME];

  if (status === "readyToStart") {
    dispatch(switchToActiveActionCreator);
  }
};
