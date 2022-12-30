import { LayoutConfig } from "../../../../../models/layoutConfigModel";

export const isGameWon = (
  layoutConfig: LayoutConfig,
  markedMines: number,
  minesQn: number
) => {
  if (markedMines !== minesQn) {
    return false;
  }

  for (const tab of layoutConfig) {
    for (const cell of tab) {
      if (cell.hasMine && cell.status !== "marked") {
        return false;
      }
    }
  }

  return true;
};
