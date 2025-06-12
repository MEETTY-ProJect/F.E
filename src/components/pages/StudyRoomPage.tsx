// src/pages/StudyRoomPage.tsx
import React, { useState } from "react";
import Header from "../StudyRoom/Header";
import Sidebar from "../StudyRoom/Sidebar";
import MainContent from "../StudyRoom/MainContent";
import RightPanel from "../StudyRoom/RightPanel";
import styles from "./styles/MyStudyRooms.module.css";

const StudyRoomPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.container}>
      <Header isOpen={isOpen} onToggle={togglePanel} />

      <div className={styles.body}>
        <Sidebar />
        <MainContent />
        <RightPanel isOpen={isOpen} />
      </div>
    </div>
  );
};

export default StudyRoomPage;
