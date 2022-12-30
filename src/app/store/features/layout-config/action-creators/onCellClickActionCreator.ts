import { type CellData } from "../../../../../models/layoutConfigModel";
import { type AppReduxDispatch, type AppReduxGetState } from "../../../store";
import { switchToFaultActionCreator } from "../../game-config/action-creators/switchToFaultActionCreator";
import { LAYOUT_CONFIG_SLICE_NAME } from "../consts";
import { layoutConfigUpdated } from "../layoutConfigSlice";

import { isGameReadyToStartOrActive } from "../../game-config/utilities/isGameReadyToStartOrActive";
import { switchToActiveState } from "../../game-config/utilities/switchToActiveState";
import { calcNewLayoutConfig } from "../utilities/calcNewLayoutConfig";
import { isError } from "../utilities/isError";

export const onCellClickActionCreator =
  (pos: CellData["pos"]) =>
  (dispatch: AppReduxDispatch, getState: AppReduxGetState) => {
    if (!isGameReadyToStartOrActive(getState)) {
      return;
    }

    switchToActiveState(dispatch, getState);

    let { [LAYOUT_CONFIG_SLICE_NAME]: layoutConfig } = getState();

    const { row, col } = pos;

    const cell = layoutConfig[row][col];

    if (cell.status !== "unrevealed" && cell.status !== "uncertainMark") {
      return;
    }

    const newLayoutConfig = calcNewLayoutConfig(pos, layoutConfig);

    dispatch(layoutConfigUpdated({ newLayoutConfig }));

    if (isError(newLayoutConfig)) {
      dispatch(switchToFaultActionCreator);
    }
  };
