import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CellData, LayoutConfig } from "../../../../models/layoutConfigModel";
import { useAppSelector } from "../../hooks/hooks";
import { LAYOUT_CONFIG_SLICE_NAME } from "./consts";

export const useSelectLayoutConfig = () =>
  useAppSelector((state) => state[LAYOUT_CONFIG_SLICE_NAME]);

export const useSelectCell = (pos: CellData["pos"]) =>
  useAppSelector((state) => state[LAYOUT_CONFIG_SLICE_NAME][pos.row][pos.col]);

const layoutConfigSlice = createSlice({
  name: LAYOUT_CONFIG_SLICE_NAME,
  initialState: [] as LayoutConfig,
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
    layoutConfigUpdated(
      _,
      action: PayloadAction<{ newLayoutConfig: LayoutConfig }>
    ) {
      const { newLayoutConfig } = action.payload;

      return newLayoutConfig;
    },
    cellStatusUpdated(
      state,
      action: PayloadAction<{
        pos: CellData["pos"];
        newStatus: CellData["status"];
      }>
    ) {
      const {
        pos: { row, col },
        newStatus,
      } = action.payload;

      state[row][col].status = newStatus;
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

export const { layoutConfigUpdated, cellStatusUpdated } =
  layoutConfigSlice.actions;

export default layoutConfigSlice.reducer;
