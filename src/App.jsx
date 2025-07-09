import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "pages/Home";
import FlowgramPage from "pages/FlowgramPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/flowgram/:id"
          element={<FlowgramPage />}
        />
      </Routes>
    </Router>
  );
}
