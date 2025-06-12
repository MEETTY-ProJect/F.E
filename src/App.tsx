import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import SignUp from "./components/pages/SignUp";
import MainPage from "./components/pages/MainPage";
import MyInfo from "./components/pages/MyInfo";
import MyStudyRooms from "./components/pages/MyStudyRooms";
import StudyRoomPage from "./components/pages/StudyRoomPage";
import Header from "./components/common/Header";

const App: React.FC = () => {
  const noHeaderPaths = ["/login", "/signup", "/study-room", "/main"];
  const hideDefaultHeader =
    location.pathname.startsWith("/study-room") ||
    noHeaderPaths.includes(location.pathname);

  return (
    <Router>
      {!hideDefaultHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/main" element={<MainPage />} />
        {/* 로그아웃했을때 다시 로그인 페이지로 */}
        <Route path="/login" element={<Login />} />
        <Route path="study-room/:roomId" element={<StudyRoomPage />} />
        <Route path="/myrooms" element={<MyStudyRooms />} />
        <Route path="/info" element={<MyInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
