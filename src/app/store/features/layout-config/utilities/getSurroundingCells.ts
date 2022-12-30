import type {
  CellData,
  LayoutConfig,
} from "../../../../../models/layoutConfigModel";
import { getCellsInRow } from "./getCellsInRow";

export const getSurroundingCells = (
  pos: CellData["pos"],
  layoutConfig: LayoutConfig
) => {
  const surroundingCells: CellData[] = [];

  const prevRow = pos.row - 1;
  const nextRow = pos.row + 1;
  const prevCol = pos.col - 1;
  const nextCol = pos.col + 1;

  if (prevRow >= 0) {
    surroundingCells.push(
      ...getCellsInRow(prevRow, pos.col, prevCol, nextCol, layoutConfig)
    );
  }

  if (nextRow < layoutConfig.length) {
    surroundingCells.push(
      ...getCellsInRow(nextRow, pos.col, prevCol, nextCol, layoutConfig)
    );
  }

  if (prevCol >= 0) {
    surroundingCells.push(layoutConfig[pos.row][prevCol]);
  }

  if (nextCol < layoutConfig[pos.row].length) {
    surroundingCells.push(layoutConfig[pos.row][nextCol]);
  }

  return surroundingCells;
};
