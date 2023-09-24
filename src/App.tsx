import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
