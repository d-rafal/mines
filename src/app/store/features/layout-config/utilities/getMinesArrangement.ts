import { getRandomIntInclusive } from "../../../../../utilities/getRandomIntInclusive";

export const getMinesArrangement = (
  rowsSize: number,
  colsSize: number,
  minesQn: number
) => {
  const mines = new Set<number>();

  while (mines.size < minesQn) {
    mines.add(getRandomIntInclusive(0, rowsSize * colsSize - 1));
  }

  return mines;
};
