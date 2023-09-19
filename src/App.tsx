import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Editor from "./pages/Editor";

function App() {
  return (
    <div className="min-h-screen bg-zinc-700">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
