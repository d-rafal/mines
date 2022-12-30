import { type CellData } from "../../../../../models/layoutConfigModel";
import { type AppReduxDispatch, type AppReduxGetState } from "../../../store";
import { switchToWonActionCreator } from "../../game-config/action-creators/switchToWonActionCreator";
import { GAME_CONFIG_SLICE_NAME } from "../../game-config/consts";
import {
  markedMinesDecreased,
  markedMinesIncreased,
} from "../../game-config/gameConfigSlice";
import { isGameReadyToStartOrActive } from "../../game-config/utilities/isGameReadyToStartOrActive";
import { switchToActiveState } from "../../game-config/utilities/switchToActiveState";
import { LAYOUT_CONFIG_SLICE_NAME } from "../consts";
import { cellStatusUpdated } from "../layoutConfigSlice";
import { isGameWon } from "../utilities/isGameWon";

export const onCellContextMenuActionCreator =
  (pos: CellData["pos"]) =>
  (dispatch: AppReduxDispatch, getState: AppReduxGetState) => {
    if (!isGameReadyToStartOrActive(getState)) {
      return;
    }

    switchToActiveState(dispatch, getState);

    let {
      [LAYOUT_CONFIG_SLICE_NAME]: layoutConfig,
      [GAME_CONFIG_SLICE_NAME]: { markedMines: alreadyMarkedMines, minesQn },
    } = getState();

    const originalCellData = layoutConfig[pos.row][pos.col];

    let newStatus: CellData["status"] | null = null;

    const shouldSetToMarked =
      originalCellData.status === "unrevealed" && alreadyMarkedMines < minesQn;

    const shouldSetToUncertainMark =
      originalCellData.status === "marked" ||
      (originalCellData.status === "unrevealed" &&
        alreadyMarkedMines >= minesQn);

    const shouldSetToUnrevealed = originalCellData.status === "uncertainMark";

    if (shouldSetToMarked) {
      newStatus = "marked";
    } else if (shouldSetToUncertainMark) {
      newStatus = "uncertainMark";
    } else if (shouldSetToUnrevealed) {
      newStatus = "unrevealed";
    }

    if (newStatus !== null) {
      dispatch(cellStatusUpdated({ pos, newStatus }));
    } else {
      return;
    }

    const updatedLayoutConfig = getState()[LAYOUT_CONFIG_SLICE_NAME];
    const updatedStatus = updatedLayoutConfig[pos.row][pos.col].status;

    if (updatedStatus === "marked") {
      dispatch(markedMinesIncreased());
    } else if (originalCellData.status === "marked") {
      dispatch(markedMinesDecreased());
    } else {
      return;
    }

    const { markedMines } = getState()[GAME_CONFIG_SLICE_NAME];

    if (isGameWon(updatedLayoutConfig, markedMines, minesQn)) {
      dispatch(switchToWonActionCreator);
    }
  };
