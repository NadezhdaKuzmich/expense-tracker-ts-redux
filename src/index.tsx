import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import store from "./store/store";
import reportWebVitals from "./reportWebVitals";

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

reportWebVitals();