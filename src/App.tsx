import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Main } from "./pages/main-page";
import { Login } from "./pages/login";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
