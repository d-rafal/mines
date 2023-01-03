// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { PreloadedState } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render, RenderOptions, configure } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "./app/store/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { GAME_CONFIG_SLICE_NAME } from "./app/store/features/game-config/consts";
import { initialState as gameConfigInitialState } from "./app/store/features/game-config/gameConfigSlice";
import { initialState as showElementsInitialState } from "./app/store/features/show-elements/showElementsSlice";
import { LAYOUT_CONFIG_SLICE_NAME } from "./app/store/features/layout-config/consts";
import { SHOW_ELEMENTS_SLICE_NAME } from "./app/store/features/show-elements/consts";

interface ExtendedRenderOptions
  extends Omit<RenderOptions, "wrapper" | "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  initialRoutes?: string[];
}

export const mockedStoreInitialState: PreloadedState<RootState> = {
  [GAME_CONFIG_SLICE_NAME]: gameConfigInitialState,
  [LAYOUT_CONFIG_SLICE_NAME]: [],
  [SHOW_ELEMENTS_SLICE_NAME]: showElementsInitialState,
};

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = mockedStoreInitialState,
    store = setupStore(preloadedState),
    initialRoutes,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper = ({
    children,
  }: {
    children: React.ReactNode;
  }): JSX.Element => {
    const routerWrapper = initialRoutes ? (
      <MemoryRouter initialEntries={initialRoutes}>{children}</MemoryRouter>
    ) : (
      <BrowserRouter>{children}</BrowserRouter>
    );

    return <Provider store={store}>{routerWrapper}</Provider>;
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

configure({ throwSuggestions: true });

beforeAll(() => {});

beforeEach(() => {
  // @ts-ignore
  delete window.ResizeObserver;
  window.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
  // jest.useFakeTimers();
});

afterEach(() => {
  window.ResizeObserver = ResizeObserver;

  // jest.runOnlyPendingTimers();
  // jest.useRealTimers();

  jest.restoreAllMocks();
});
afterAll(() => {});

export * from "@testing-library/react";
export { renderWithProviders as render };
