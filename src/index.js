import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { StateProvider } from "./context/StateProvider";
import reducer, { initialState } from "./reducers/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <StateProvider initialState={initialState} reducer={reducer}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </StateProvider>
    </AuthProvider>
  </BrowserRouter>
);
