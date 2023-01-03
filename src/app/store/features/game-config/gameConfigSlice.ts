import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { shallowEqual } from "react-redux";
import {
  GameStatus,
  MAX_BEST_TIMES,
  WonMessage,
  WonMessageUnion,
  type GameConfig,
} from "../../../../models/gameConfigModel";
import { useAppSelector } from "../../hooks/hooks";
import { GAME_CONFIG_SLICE_NAME } from "./consts";
import { getSerializedGameDifficulty } from "./utilities/getSerializedGameDifficulty";
import { isGameDifficultyInBestResults } from "./utilities/isGameDifficultyInBestResults";

export const useSelectGameConfig = () =>
  useAppSelector((state) => state[GAME_CONFIG_SLICE_NAME]);

export const useSelectGameStatus = () =>
  useAppSelector((state) => state[GAME_CONFIG_SLICE_NAME].status);

export const useSelectWonMessageType = () =>
  useAppSelector((state) => state[GAME_CONFIG_SLICE_NAME].wonMessageType);

export const useSelectPausedByPauseBtn = () =>
  useAppSelector((state) => state[GAME_CONFIG_SLICE_NAME].pausedByPauseBtn);

export const useSelectGameDuration = () =>
  useAppSelector((state) => state[GAME_CONFIG_SLICE_NAME].gameDuration);

export const useSelectIntervalID = () =>
  useAppSelector((state) => state[GAME_CONFIG_SLICE_NAME].intervalID);

export const useSelectBestResultsRoster = () =>
  useAppSelector((state) => state[GAME_CONFIG_SLICE_NAME].bestResultsRoster);

export const useSelectMinesStatus = () =>
  useAppSelector(
    (state) =>
      [
        state[GAME_CONFIG_SLICE_NAME].minesQn,
        state[GAME_CONFIG_SLICE_NAME].markedMines,
      ] as const,
    shallowEqual
  );

export const useSelectLayoutSize = () =>
  useAppSelector(
    (state) =>
      [
        state[GAME_CONFIG_SLICE_NAME].rowsSize,
        state[GAME_CONFIG_SLICE_NAME].colsSize,
      ] as const,
    shallowEqual
  );

export const useSelectSerializedGameDifficulty = () =>
  useAppSelector((state) => {
    const { rowsSize, colsSize, minesQn } = state[GAME_CONFIG_SLICE_NAME];

    return getSerializedGameDifficulty(rowsSize, colsSize, minesQn);
  });

export const useSelectBestResults = (serializeGameDifficulty: string) =>
  useAppSelector((state) => {
    const { bestResultsRoster } = state[GAME_CONFIG_SLICE_NAME];

    if (
      isGameDifficultyInBestResults(serializeGameDifficulty, bestResultsRoster)
    ) {
      return bestResultsRoster[serializeGameDifficulty];
    }

    return undefined;
  });

export const initialState: GameConfig = {
  status: GameStatus.Idle,
  wonMessageType: WonMessage.None,
  pausedByPauseBtn: false,
  gameDuration: 0,
  timeAccumulated: 0,
  changeToActiveTime: null,
  intervalID: null,
  bestResultsRoster: {},
  rowsSize: 0,
  colsSize: 0,
  minesQn: 0,
  markedMines: 0,
};

const gameConfigSlice = createSlice({
  name: GAME_CONFIG_SLICE_NAME,
  initialState: initialState as GameConfig,
  reducers: {
    // readyToStartStatusActivated: {
    //   reducer(_, action: PayloadAction<GameConfig>) {
    //     return action.payload;
    //   },
    //   prepare(rowsSize: number, colsSize: number, minesPercent: number) {
    //     return {
    //       payload: initialState,
    //     };
    //   },
    // },
    switchToIdle(state, _: PayloadAction<void>) {
      const newState: GameConfig = {
        ...initialState,
        bestResultsRoster: state.bestResultsRoster,
      };

      return newState;
    },

    switchToReadyToStart(
      state,
      action: PayloadAction<
        Pick<GameConfig, "rowsSize" | "colsSize" | "minesQn">
      >
    ) {
      const { rowsSize, colsSize, minesQn } = action.payload;

      state.status = GameStatus.ReadyToStart;
      state.wonMessageType = WonMessage.None;
      state.pausedByPauseBtn = false;
      state.gameDuration = 0;
      state.timeAccumulated = 0;
      state.intervalID = null;
      state.changeToActiveTime = null;
      state.rowsSize = rowsSize;
      state.colsSize = colsSize;
      state.minesQn = minesQn;
      state.markedMines = 0;
    },
    switchToActive(
      state,
      action: PayloadAction<{
        intervalID: NodeJS.Timer;
        changeToActiveTime: number;
      }>
    ) {
      const { intervalID, changeToActiveTime } = action.payload;

      state.status = GameStatus.Active;
      state.pausedByPauseBtn = false;
      state.intervalID = intervalID;
      state.changeToActiveTime = changeToActiveTime;
    },
    switchToPaused(
      state,
      action: PayloadAction<{
        changeToPausedTime: number;
        byPauseBtn?: boolean;
      }>
    ) {
      const { changeToPausedTime, byPauseBtn } = action.payload;

      if (state.status === GameStatus.Active) {
        if (state.changeToActiveTime) {
          state.gameDuration = calculateGameDuration(
            state.timeAccumulated,
            state.changeToActiveTime,
            changeToPausedTime
          );
        }

        state.timeAccumulated = state.gameDuration;
      }

      state.status = GameStatus.Paused;

      byPauseBtn && (state.pausedByPauseBtn = true);
    },
    updateGameTime(state, action: PayloadAction<{ actualTime: number }>) {
      const { actualTime } = action.payload;

      if (state.changeToActiveTime) {
        state.gameDuration = calculateGameDuration(
          state.timeAccumulated,
          state.changeToActiveTime,
          actualTime
        );
      }
    },
    markedMinesIncreased(state, action: PayloadAction<void>) {
      state.markedMines++;
    },
    markedMinesDecreased(state, action: PayloadAction<void>) {
      state.markedMines--;
    },
    switchToWon(
      state,
      action: PayloadAction<{
        changeToWonTime: number;
        wonMessageType: WonMessageUnion;
      }>
    ) {
      const { changeToWonTime, wonMessageType } = action.payload;

      state.status = GameStatus.Won;
      state.wonMessageType = wonMessageType;

      if (state.changeToActiveTime) {
        state.gameDuration = calculateGameDuration(
          state.timeAccumulated,
          state.changeToActiveTime,
          changeToWonTime
        );
      }
    },

    womMessageModalHidden(state, action: PayloadAction<void>) {
      state.wonMessageType = WonMessage.None;
    },

    testModal(state, action: PayloadAction<void>) {
      state.status = GameStatus.Won;
      state.wonMessageType = WonMessage.BestTime;
    },

    switchToFault(state, action: PayloadAction<void>) {
      state.status = GameStatus.Fault;
    },

    newBestResultAdded(
      state,
      action: PayloadAction<{ index: number; playerName: string }>
    ) {
      const { rowsSize, colsSize, minesQn, bestResultsRoster, gameDuration } =
        state;
      const { index, playerName } = action.payload;

      const serializedGameDifficulty = getSerializedGameDifficulty(
        rowsSize,
        colsSize,
        minesQn
      );

      if (
        isGameDifficultyInBestResults(
          serializedGameDifficulty,
          bestResultsRoster
        )
      ) {
        const bestResults = bestResultsRoster[serializedGameDifficulty];

        bestResults.splice(index, bestResults.length < MAX_BEST_TIMES ? 0 : 1, {
          time: gameDuration,
          player: playerName,
        });
      } else {
        bestResultsRoster[serializedGameDifficulty] = [
          {
            time: gameDuration,
            player: playerName,
          },
        ];
      }
    },
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(switchToActiveActionCreator.fulfilled, (state, _) => {
  //       state.status = GameStatus.Active;
  //     })
  //     .addCase(switchToPausedActionCreator.fulfilled, (state, action) => {
  //       state.status = GameStatus.Paused;
  //       state.gameDuration =
  //         state.gameDurationBase + action.payload.durationOfActiveState;
  //       state.gameDurationBase = state.gameDuration;
  //     });
  // },
});

function calculateGameDuration(
  timeAccumulated: number,
  changeToActiveTime: number,
  actualTime: number
) {
  return timeAccumulated + (actualTime - changeToActiveTime);
}

export const {
  switchToReadyToStart,
  switchToActive,
  switchToPaused,
  markedMinesIncreased,
  markedMinesDecreased,
  switchToWon,
  updateGameTime,
  switchToFault,
  switchToIdle,
  womMessageModalHidden,
  testModal,
  newBestResultAdded,
} = gameConfigSlice.actions;

export default gameConfigSlice.reducer;
