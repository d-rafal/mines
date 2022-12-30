import { AppReduxDispatch, AppReduxGetState } from "../../../store";
import { LAYOUT_CONFIG_SLICE_NAME } from "../../layout-config/consts";
import { layoutConfigUpdated } from "../../layout-config/layoutConfigSlice";
import { verifyMarks } from "../../layout-config/utilities/verifyMarks";
import { switchToFault } from "../gameConfigSlice";
import { clearIntervalID } from "../utilities/clearIntervalID";

export const switchToFaultActionCreator = (
  dispatch: AppReduxDispatch,
  getState: AppReduxGetState
) => {
  clearIntervalID(getState);

  dispatch(switchToFault());

  const newLayoutConfigWithVerifiedMarks = verifyMarks(
    getState()[LAYOUT_CONFIG_SLICE_NAME]
  );
  dispatch(
    layoutConfigUpdated({
      newLayoutConfig: newLayoutConfigWithVerifiedMarks,
    })
  );
};
