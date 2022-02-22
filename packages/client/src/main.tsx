import React from "react";
import ReactDOM from "react-dom";
import "./styles/normalize.css";
import "./styles/index.css";
import App from "./components/app";
// import { render, events } from "@react-three/fiber";
import { createDatabase } from "./db";
import { Provider } from "react-redux";
import { store } from "./app/store";
createDatabase();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// @ts-ignore
if(window.Cypress){
  // @ts-ignore
  window.store =store
}