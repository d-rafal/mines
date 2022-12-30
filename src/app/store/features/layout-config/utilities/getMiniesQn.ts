export const getMinesQn = (
  rowsSize: number,
  colsSize: number,
  minesPercent: number
) => Math.floor((rowsSize * colsSize * minesPercent) / 100);
