import { AppReduxDispatch, AppReduxGetState } from "../../../store";
import { switchToPaused } from "../gameConfigSlice";
import { clearIntervalID } from "../utilities/clearIntervalID";

export const switchToPausedActionCreator =
  ({ byPauseBtn = false }: { byPauseBtn?: boolean }) =>
  (dispatch: AppReduxDispatch, getState: AppReduxGetState) => {
    clearIntervalID(getState);

    dispatch(switchToPaused({ changeToPausedTime: Date.now(), byPauseBtn }));
  };
