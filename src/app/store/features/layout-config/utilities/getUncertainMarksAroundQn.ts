import type {
  CellData,
  LayoutConfig,
} from "../../../../../models/layoutConfigModel";
import { getSurroundingCells } from "./getSurroundingCells";

export const getUncertainMarksAroundQn = (
  pos: CellData["pos"],
  layoutConfig: LayoutConfig
) =>
  getSurroundingCells(pos, layoutConfig).filter(
    (cell) => cell.status === "uncertainMark"
  ).length;
