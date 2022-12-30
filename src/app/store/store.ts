import {
  combineReducers,
  configureStore,
  PreloadedState,
} from "@reduxjs/toolkit";
import { GAME_CONFIG_SLICE_NAME } from "./features/game-config/consts";
import gameConfigReducer from "./features/game-config/gameConfigSlice";
import { LAYOUT_CONFIG_SLICE_NAME } from "./features/layout-config/consts";
import layoutConfigReducer from "./features/layout-config/layoutConfigSlice";

const extraArgument = null;

const rootReducer = combineReducers({
  [GAME_CONFIG_SLICE_NAME]: gameConfigReducer,
  [LAYOUT_CONFIG_SLICE_NAME]: layoutConfigReducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    preloadedState: preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArgument,
        },
      }),
    enhancers: (defaultEnhancers) => [...defaultEnhancers],
  });

  return store;
};

export const store = setupStore();

export type AppStore = ReturnType<typeof setupStore>;
export type AppReduxDispatch = typeof store.dispatch;
export type AppReduxGetState = typeof store.getState;
export type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;
