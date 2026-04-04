import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/globals.css";
import "./styles/index.css";
import { HelmetProvider } from "react-helmet-async";

const rootElement = document.getElementById("root") as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <HelmetProvider>
      {" "}
      {/* 👈  */}
      <App />
    </HelmetProvider>
  </React.StrictMode>,
);
