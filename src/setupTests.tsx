// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import { PreloadedState } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { render, RenderOptions, configure } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "./app/store/store";
// import ContextsProvider from "./components/contexts-provider/ContextsProvider";
// import { server } from "./mocks/server";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import { GAME_CONFIG_SLICE_NAME } from "./app/store/features/game-config/consts";
import { initialState } from "./app/store/features/game-config/gameConfigSlice";
import { LAYOUT_CONFIG_SLICE_NAME } from "./app/store/features/layout-config/consts";
// import ReportedMessages from "./components/reported-messages/ReportedMessages";

interface ExtendedRenderOptions
  extends Omit<RenderOptions, "wrapper" | "queries"> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  initialRoutes?: string[] | null;
}

export const mockedStoreInitialState: PreloadedState<RootState> = {
  [GAME_CONFIG_SLICE_NAME]: initialState,
  [LAYOUT_CONFIG_SLICE_NAME]: [],
};

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = mockedStoreInitialState,
    store = setupStore(preloadedState),
    initialRoutes = null,
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

    return (
      <Provider store={store}>
        {/* <ContextsProvider> */}
        {routerWrapper}
        {/* <ReportedMessages /> */}
        {/* </ContextsProvider> */}
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

configure({ throwSuggestions: true });

beforeAll(() => {
  // server.listen();
});

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

  // server.resetHandlers();

  // jest.runOnlyPendingTimers();
  // jest.useRealTimers();

  jest.restoreAllMocks();
});
afterAll(() => {
  // server.close();
});

export * from "@testing-library/react";
export { renderWithProviders as render };
