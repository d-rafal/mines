import type {
  CellData,
  LayoutConfig,
} from "../../../../../models/layoutConfigModel";
import { getSurroundingCells } from "./getSurroundingCells";

export const getFirstUnrevealedSurroundingCell = (
  pos: CellData["pos"],
  layoutConfig: LayoutConfig
) => {
  const unrevealedSurroundingCells = getSurroundingCells(
    pos,
    layoutConfig
  ).filter((cell) => cell.status === "unrevealed");
  return unrevealedSurroundingCells.length
    ? unrevealedSurroundingCells[0]
    : undefined;
};
