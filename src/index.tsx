import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { store } from "./app/store/store";
import { Provider } from "react-redux";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.scss";
import WelcomeDialog from "./components/welcome-dialog/WelcomeDialog";
import { clearLocalStorageOnExit } from "./utilities/clearLocalStorageOnExit";

clearLocalStorageOnExit();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <WelcomeDialog />
      <App />
    </Provider>
  </React.StrictMode>
);
