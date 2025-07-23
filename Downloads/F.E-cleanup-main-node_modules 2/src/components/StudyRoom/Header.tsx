import React, { useState } from "react";
import styles from "./Header.module.css";
import humanIcon from "@assets/human-white.svg";
// import ArrowDown from "@assets/chevron-down.svg";
// import ArrowUp from "@assets/chevron-up.svg";
// import ChattingPanel from "./ChattingPanel";
import ArrowToggle from "./ArrowToggle";
import { StudyRoomInfo } from "../../api/studyroomInfo.api";

interface HeaderProps {
  isOpen: boolean;
  onToggle: () => void;
  roomInfo: StudyRoomInfo;
}

const Header = ({ isOpen, onToggle, roomInfo }: HeaderProps) => {
  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        <span className={styles["header-left-name"]}>{roomInfo.roomName}</span>
        <span className={styles["header-left-bar"]}>|</span>
        <img src={humanIcon} alt="humanIcon" className={styles["human-icon"]} />
        <span className={styles["header-left-number"]}>
          {roomInfo.currentMemberCount}
        </span>
      </div>
      <div className={styles["header-right"]}>
        <ArrowToggle isOpen={isOpen} onClick={onToggle} />
      </div>
    </header>
  );
};

export default Header;
