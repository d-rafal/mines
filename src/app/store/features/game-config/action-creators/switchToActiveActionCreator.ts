import { AppReduxDispatch, AppReduxGetState } from "../../../store";
import { switchToActive, updateGameTime } from "../gameConfigSlice";

export const switchToActiveActionCreator = (
  dispatch: AppReduxDispatch,
  _: AppReduxGetState
) => {
  const intervalID = setInterval(() => {
    dispatch(updateGameTime({ actualTime: Date.now() }));
  }, 1000);

  dispatch(switchToActive({ intervalID, changeToActiveTime: Date.now() }));
};
