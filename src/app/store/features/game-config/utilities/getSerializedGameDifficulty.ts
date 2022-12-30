export const getSerializedGameDifficulty = (
  rowsSize: number,
  colsSize: number,
  minesQn: number
) => {
  return `${rowsSize} x ${colsSize}, ${minesQn} mines`;
};
