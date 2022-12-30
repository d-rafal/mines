import type {
  CellData,
  LayoutConfig,
} from "../../../../../models/layoutConfigModel";
import { getSurroundingCells } from "./getSurroundingCells";

export const getMinesAroundQn = (
  pos: CellData["pos"],
  layoutConfig: LayoutConfig
) =>
  getSurroundingCells(pos, layoutConfig).filter((cell) => cell.hasMine).length;
