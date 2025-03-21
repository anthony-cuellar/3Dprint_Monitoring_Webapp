import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import DetectorPage from "./DetectorPage";
import SuccessPage from "./SuccessPage";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/detect" element={<DetectorPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/error" element={<ErrorPage />} />
    </Routes>
  );
}

export default App;
