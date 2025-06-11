import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import MainPage from "./components/pages/MainPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        {/* 로그아웃했을때 다시 로그인 페이지로 */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
