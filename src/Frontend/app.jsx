import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import DetectorPage from "./DetectorPage";

function App() {
  return (
    <Routes>
      {/* "/" -> the main landing page */}
      <Route path="/" element={<Home />} />
      {/* "/detect" -> the waiting/detection page */}
      <Route path="/detect" element={<DetectorPage />} />
    </Routes>
  );
}

export default App;
