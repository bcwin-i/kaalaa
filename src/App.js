import React from "react";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route index element={<Dashboard />} />
    </Routes>
  );
}

export default App;
