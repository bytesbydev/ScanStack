import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Analyzing from "./pages/Analyzing";
import Results from "./pages/Results";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/analyzing" element={<Analyzing />} />
      <Route path="/results" element={<Results />} />

      <Route
        path="*"
        element={
          <div className="flex min-h-screen flex-col items-center justify-center gap-3">
            <h1 className="text-4xl font-bold">404</h1>
            <p>Page not found.</p>
            <a href="/" className="text-blue-600 hover:underline">
              Back to Home
            </a>
          </div>
        }
      />
    </Routes>
  );
};

export default App;