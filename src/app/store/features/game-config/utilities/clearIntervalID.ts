import { AppReduxGetState } from "../../../store";
import { GAME_CONFIG_SLICE_NAME } from "../consts";

export const clearIntervalID = (getState: AppReduxGetState) => {
  const { intervalID } = getState()[GAME_CONFIG_SLICE_NAME];

  if (intervalID) {
    clearInterval(intervalID);
  }
};
