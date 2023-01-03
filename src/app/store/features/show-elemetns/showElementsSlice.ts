import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ShowElements } from "../../../../models/showElementsModel";
import { useAppSelector } from "../../hooks/hooks";
import { SHOW_ELEMENTS_SLICE_NAME } from "./consts";

export const useSelectShouldShowBestResults = () =>
  useAppSelector(
    (state) => state[SHOW_ELEMENTS_SLICE_NAME].shouldShowBestResults
  );

export const useSelectShouldShowWelcomeDialog = () =>
  useAppSelector(
    (state) => state[SHOW_ELEMENTS_SLICE_NAME].shouldShowWelcomeDialog
  );

export const initialState: ShowElements = {
  shouldShowBestResults: false,
  shouldShowWelcomeDialog: true,
};

const showElementsSlice = createSlice({
  name: SHOW_ELEMENTS_SLICE_NAME,
  initialState: initialState as ShowElements,
  reducers: {
    showWelcomeDialog(state, _: PayloadAction<void>) {
      state.shouldShowWelcomeDialog = true;
    },
    hideWelcomeDialog(state, _: PayloadAction<void>) {
      state.shouldShowWelcomeDialog = false;
    },

    showBestResults(state, _: PayloadAction<void>) {
      state.shouldShowBestResults = true;
    },
    hideBestResults(state, _: PayloadAction<void>) {
      state.shouldShowBestResults = false;
    },
  },
});

export const {
  showWelcomeDialog,
  hideWelcomeDialog,
  showBestResults,
  hideBestResults,
} = showElementsSlice.actions;

export default showElementsSlice.reducer;
