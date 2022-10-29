import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { StoreProvider } from "./context/StoreProvider";
import reducer, { initialState } from "./reducers/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <StoreProvider initialState={initialState} reducer={reducer}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </StoreProvider>
    </AuthProvider>
  </BrowserRouter>
);
