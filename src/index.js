import React from "react";
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    {/* <StrictMode> */}
      <AppRoutes />
    {/* </StrictMode> */}
  </BrowserRouter>
);
