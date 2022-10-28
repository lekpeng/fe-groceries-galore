import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartProvider";
import cartReducer, { initialCartState } from "./reducers/CartReducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider intialCartState={initialCartState} cartReducer={cartReducer}>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);
