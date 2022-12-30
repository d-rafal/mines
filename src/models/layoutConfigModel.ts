export const DEFAULT_LAYOUTS = {
  smallSize: { rowsSize: 8, colsSize: 8, minesQn: 10 } as const,
  mediumSize: { rowsSize: 16, colsSize: 16, minesQn: 40 } as const,
  largeSize: { rowsSize: 16, colsSize: 30, minesQn: 99 } as const,
};

export const CUSTOM_LAYOUT_LIMITS = {
  minSize: 4 as const,
  maxSize: 100 as const,
  minMinesPercent: 1 as const,
  maxMinesPercent: 30 as const,
};

export type MinesAroundQn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface CellData {
  hasMine: boolean;
  status:
    | "unrevealed"
    | "marked"
    | MinesAroundQn
    | "empty"
    | "fault"
    | "wrongMark"
    | "correctMark"
    | "uncertainMark";
  pos: { row: number; col: number };
}

export type LayoutConfig = CellData[][];
