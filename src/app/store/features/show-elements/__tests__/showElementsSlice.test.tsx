import { ShowElements } from "../../../../../models/showElementsModel";
import reducer, { showWelcomeDialog } from "../showElementsSlice";

describe("showElementsSlice tests", () => {
  // arrange
  const initialState: ShowElements = {
    shouldShowBestResults: false,
    shouldShowWelcomeDialog: false,
  };

  test("should handle shouldShowWelcomeDialog action", () => {
    // arrange
    const previousState: ShowElements = initialState;
    const newState = reducer(previousState, showWelcomeDialog);

    //act

    // assert
    expect(newState).toEqual({
      ...initialState,
      shouldShowWelcomeDialog: true,
    });
  });
});
