import { type AppReduxDispatch, type AppReduxGetState } from "../../../store";
import { layoutConfigUpdated } from "../../layout-config/layoutConfigSlice";
import { getLayoutConfig } from "../../layout-config/utilities/getLayoutConfig";
import { switchToReadyToStart } from "../gameConfigSlice";

export const switchReadyToStartActionCreator =
  (rowsSize: number, colsSize: number, minesQn: number) =>
  (dispatch: AppReduxDispatch, _: AppReduxGetState) => {
    const layoutConfig = getLayoutConfig(rowsSize, colsSize, minesQn);

    dispatch(switchToReadyToStart({ rowsSize, colsSize, minesQn }));
    dispatch(layoutConfigUpdated({ newLayoutConfig: layoutConfig }));
  };
