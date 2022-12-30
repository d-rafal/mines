import type {
  CellData,
  LayoutConfig,
} from "../../../../../models/layoutConfigModel";
import { getSurroundingCells } from "./getSurroundingCells";

export const getFirstMarkedOrUnrevealedSurroundingCell = (
  pos: CellData["pos"],
  layoutConfig: LayoutConfig,
  alreadyHandledCells: CellData["pos"][]
) => {
  const unrevealedOrMarkedSurroundingCells = getSurroundingCells(
    pos,
    layoutConfig
  ).filter((cell) => cell.status === "marked" || cell.status === "unrevealed");

  if (unrevealedOrMarkedSurroundingCells.length) {
    for (const cell of unrevealedOrMarkedSurroundingCells) {
      if (!isAlreadyHandledCell(cell, alreadyHandledCells)) {
        return cell;
      }
    }
  }

  return undefined;
};

function isAlreadyHandledCell(
  cell: CellData,
  alreadyHandledCells: CellData["pos"][]
) {
  let isAlreadyHandledCell = false;

  for (const pos of alreadyHandledCells) {
    if (pos.row === cell.pos.row && pos.col === cell.pos.col) {
      isAlreadyHandledCell = true;
      break;
    }
  }

  return isAlreadyHandledCell;
}
