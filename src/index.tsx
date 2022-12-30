import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import { store } from "./app/store/store";
import { Provider } from "react-redux";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/700.css";

import "./index.scss";

window.addEventListener("click", () => {
  console.log("window click");
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
