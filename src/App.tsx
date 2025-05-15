import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from ".//pages/Login";
import SignUp from ".//pages/SignUp";
import MainPage from ".//pages/MainPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
      </Routes>
    </Router>
  );
};

export default App;
