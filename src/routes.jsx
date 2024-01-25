import React from "react";
import { Routes, Route } from "react-router-dom";
import { App } from "./App";
import { NotFound } from "./notFoundPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
