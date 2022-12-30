import { AppReduxDispatch, AppReduxGetState } from "../../../store";
import { layoutConfigUpdated } from "../../layout-config/layoutConfigSlice";
import { switchToIdle } from "../gameConfigSlice";
import { clearIntervalID } from "../utilities/clearIntervalID";

export const switchToIdleActionCreator = (
  dispatch: AppReduxDispatch,
  getState: AppReduxGetState
) => {
  clearIntervalID(getState);

  dispatch(switchToIdle());
  dispatch(layoutConfigUpdated({ newLayoutConfig: [] }));
};
