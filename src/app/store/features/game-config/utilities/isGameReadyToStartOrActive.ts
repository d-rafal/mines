import { AppReduxGetState } from "../../../store";
import { GAME_CONFIG_SLICE_NAME } from "../consts";

export const isGameReadyToStartOrActive = (getState: AppReduxGetState) => {
  const { status } = getState()[GAME_CONFIG_SLICE_NAME];

  return status === "readyToStart" || status === "active";
};
