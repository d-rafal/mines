export const MAX_BEST_TIMES = 10;

export enum GameStatus {
  Idle = "idle",
  ReadyToStart = "readyToStart",
  Active = "active",
  Paused = "paused",
  Fault = "fault",
  Won = "won",
}

export enum WonMessage {
  Congratulation = "Congratulation",
  BestTime = "BestTime",
  None = "none",
}

type GameStatusUnion = `${GameStatus}`;
export type WonMessageUnion = `${WonMessage}`;

export interface BestTime {
  time: GameConfig["gameDuration"];
  player: string | null;
}

export interface GameConfig {
  status: GameStatusUnion;
  wonMessageType: WonMessageUnion;
  pausedByPauseBtn: boolean;
  gameDuration: number;
  timeAccumulated: number;
  changeToActiveTime: number | null;
  intervalID: NodeJS.Timer | null;
  bestResultsRoster: {
    [key: string]: BestTime[];
  };

  rowsSize: number;
  colsSize: number;
  minesQn: number;
  markedMines: number;
}
