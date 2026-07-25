import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { PlannerProvider } from "./context/PlannerContext";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PlannerProvider>
        <App />
      </PlannerProvider>
    </BrowserRouter>
  </React.StrictMode>
);
