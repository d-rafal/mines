import { type AppReduxDispatch, type AppReduxGetState } from "../../../store";
import { layoutConfigUpdated } from "../../layout-config/layoutConfigSlice";
import { getLayoutConfig } from "../../layout-config/utilities/getLayoutConfig";
import { GAME_CONFIG_SLICE_NAME } from "../consts";
import { switchToReadyToStart } from "../gameConfigSlice";

export const restartGameActionCreator = (
  dispatch: AppReduxDispatch,
  getState: AppReduxGetState
) => {
  const { rowsSize, colsSize, minesQn } = getState()[GAME_CONFIG_SLICE_NAME];

  const layoutConfig = getLayoutConfig(rowsSize, colsSize, minesQn);

  dispatch(layoutConfigUpdated({ newLayoutConfig: layoutConfig }));
  dispatch(switchToReadyToStart({ rowsSize, colsSize, minesQn }));
};
