import { CellData } from "../../../../../models/layoutConfigModel";
import { getMinesArrangement } from "./getMinesArrangement";

export const getLayoutConfig = (
  rowsSize: number,
  colsSize: number,
  minesQn: number
) => {
  const minesArrangement = getMinesArrangement(rowsSize, colsSize, minesQn);

  const layoutConfig = new Array(rowsSize).fill(null).map((_, indexX) =>
    new Array(colsSize).fill(null).map<CellData>((_, indexY) => {
      return {
        hasMine: minesArrangement.has(indexX * colsSize + indexY),
        status: "unrevealed",
        pos: { row: indexX, col: indexY },
      };
    })
  );

  return layoutConfig;
};
