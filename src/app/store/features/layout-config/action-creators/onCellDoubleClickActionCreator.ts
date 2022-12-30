import { type CellData } from "../../../../../models/layoutConfigModel";
import { type AppReduxDispatch, type AppReduxGetState } from "../../../store";
import { switchToFaultActionCreator } from "../../game-config/action-creators/switchToFaultActionCreator";
import { isGameReadyToStartOrActive } from "../../game-config/utilities/isGameReadyToStartOrActive";
import { switchToActiveState } from "../../game-config/utilities/switchToActiveState";
import { LAYOUT_CONFIG_SLICE_NAME } from "../consts";
import { layoutConfigUpdated } from "../layoutConfigSlice";
import { calcNewLayoutConfig } from "../utilities/calcNewLayoutConfig";
import { getFirstMarkedOrUnrevealedSurroundingCell } from "../utilities/getFirstMarkedOrUnrevealedSurroundingCell";
import { getMarkedMinesAroundQn } from "../utilities/getMarkedMinesAroundQn";
import { getShallowLayoutConfigClone } from "../utilities/getShallowLayoutConfigClone";
import { getUncertainMarksAroundQn } from "../utilities/getUncertainMarksAroundQn";
import { isError } from "../utilities/isError";

export const onCellDoubleClickActionCreator =
  (pos: CellData["pos"]) =>
  (dispatch: AppReduxDispatch, getState: AppReduxGetState) => {
    if (!isGameReadyToStartOrActive(getState)) {
      return;
    }

    switchToActiveState(dispatch, getState);

    let { [LAYOUT_CONFIG_SLICE_NAME]: layoutConfig } = getState();

    const { row, col } = pos;

    const cell = layoutConfig[row][col];

    if (typeof cell.status !== "number") {
      return;
    }

    const uncertainMarks = getUncertainMarksAroundQn(pos, layoutConfig);

    if (uncertainMarks) {
      return;
    }

    const markedMinesAroundQn = getMarkedMinesAroundQn(pos, layoutConfig);

    if (markedMinesAroundQn !== cell.status) {
      return;
    }

    let shallowLayoutConfigClone = getShallowLayoutConfigClone(layoutConfig);

    let firstMarkedOrUnrevealedSurroundingCell: CellData | undefined =
      undefined;

    const alreadyHandledCells: CellData["pos"][] = [];

    while (
      (firstMarkedOrUnrevealedSurroundingCell =
        getFirstMarkedOrUnrevealedSurroundingCell(
          pos,
          shallowLayoutConfigClone,
          alreadyHandledCells
        ))
    ) {
      alreadyHandledCells.push(firstMarkedOrUnrevealedSurroundingCell.pos);
      shallowLayoutConfigClone = calcNewLayoutConfig(
        firstMarkedOrUnrevealedSurroundingCell.pos,
        shallowLayoutConfigClone,
        { doubleClickMode: true }
      );
    }
    dispatch(
      layoutConfigUpdated({ newLayoutConfig: shallowLayoutConfigClone })
    );

    if (isError(shallowLayoutConfigClone)) {
      dispatch(switchToFaultActionCreator);
    }
  };
