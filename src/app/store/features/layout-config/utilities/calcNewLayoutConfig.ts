import _ from "lodash";
import type {
  CellData,
  LayoutConfig,
  MinesAroundQn,
} from "../../../../../models/layoutConfigModel";
import { getFirstUnrevealedSurroundingCell } from "./getFirstUnrevealedSurroundingCell";
import { getMinesAroundQn } from "./getMinesAroundQn";
import { getShallowLayoutConfigClone } from "./getShallowLayoutConfigClone";

interface Options {
  doubleClickMode?: boolean;
}

export const calcNewLayoutConfig = (
  pos: CellData["pos"],
  layoutConfig: LayoutConfig,
  options: Options = {}
) => {
  let shallowLayoutConfigClone = getShallowLayoutConfigClone(layoutConfig);

  const newCellDataClone = _.cloneDeep(
    shallowLayoutConfigClone[pos.row][pos.col]
  );

  shallowLayoutConfigClone[pos.row][pos.col] = newCellDataClone;

  if (options.doubleClickMode && hasMineAndUnrevealed(newCellDataClone)) {
    newCellDataClone.status = "fault";
    return shallowLayoutConfigClone;
  }

  if (options.doubleClickMode && hasNoMineAndMarked(newCellDataClone)) {
    newCellDataClone.status = "wrongMark";
    return shallowLayoutConfigClone;
  }

  if (options.doubleClickMode && hasMineAndMarked(newCellDataClone)) {
    return shallowLayoutConfigClone;
  }

  if (newCellDataClone.hasMine) {
    newCellDataClone.status = "fault";
    return shallowLayoutConfigClone;
  }

  const minesAroundQn = getMinesAroundQn(pos, shallowLayoutConfigClone);

  if (minesAroundQn) {
    newCellDataClone.status = minesAroundQn as MinesAroundQn;
    return shallowLayoutConfigClone;
  }

  newCellDataClone.status = "empty";

  let firstUnrevealedSurroundingCell = undefined;

  while (
    (firstUnrevealedSurroundingCell = getFirstUnrevealedSurroundingCell(
      pos,
      shallowLayoutConfigClone
    ))
  ) {
    shallowLayoutConfigClone = calcNewLayoutConfig(
      firstUnrevealedSurroundingCell.pos,
      shallowLayoutConfigClone
    );
  }

  return shallowLayoutConfigClone;
};

function hasMineAndUnrevealed(cell: CellData) {
  return cell.hasMine && cell.status === "unrevealed";
}

function hasNoMineAndMarked(cell: CellData) {
  return !cell.hasMine && cell.status === "marked";
}

function hasMineAndMarked(cell: CellData) {
  return cell.hasMine && cell.status === "marked";
}
