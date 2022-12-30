import { type LayoutConfig } from "../../../../../models/layoutConfigModel";

export const getCellsInRow = (
  row: number,
  posY: number,
  prevCol: number,
  nextCol: number,
  layoutConfig: LayoutConfig
) => {
  let cellsInRow = [layoutConfig[row][posY]];

  if (prevCol >= 0) {
    cellsInRow.push(layoutConfig[row][prevCol]);
  }

  if (nextCol < layoutConfig[row].length) {
    cellsInRow.push(layoutConfig[row][nextCol]);
  }

  return cellsInRow;
};
