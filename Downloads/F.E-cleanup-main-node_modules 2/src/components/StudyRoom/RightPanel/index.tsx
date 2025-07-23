import React from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import ChatSection from "./ChatSection";
import styles from "./RightPanel.module.css";

import testProfileImage from "@assets/사회력소진짤.png";

interface PanelProps {
  isOpen: boolean;
}

// ✅ 더미 데이터: 참여자 목록
const participants = [
  { name: "도구리", profile: testProfileImage, isLeader: true },
  {
    name: "오늘도 고생 많았어요!",
    profile: testProfileImage,
    isLeader: false,
  },
  {
    name: "오늘도 알찬 하루였...",
    profile: testProfileImage,
    isLeader: false,
  },
  { name: "있었는데 없었습니다.", profile: null, isLeader: false },
  { name: "사랑해 도구리!!", profile: testProfileImage, isLeader: false },
  { name: "귀엽다 도구리!!", profile: testProfileImage, isLeader: false },
];

// ✅ 채팅 메시지 더미 데이터
const chatMessages = [
  {
    id: 1,
    user: "오늘도 고생 많았어요!",
    profile: testProfileImage,
    content:
      "어제 하루 고생했잖아요! 오늘도 화이팅 해보자! 마지막까지 화이팅!!",
    time: "09:30",
  },
  {
    id: 2,
    user: "도구리",
    profile: testProfileImage,
    content: "도구리는 너구리랑 귀엽고 편해지짛!",
    time: "09:31",
  },
];

const RightPanel = ({ isOpen }: PanelProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.panelContainer}>
      <div className={`${styles.section} ${styles.participants}`}>
        <div className={styles.sectionTitle}>참여자 목록</div>
        <div className={styles.sectionContent}>
          <ParticipantsList participants={participants} />
        </div>
      </div>
      <div className={`${styles.section} ${styles.chat}`}>
        <div className={styles.sectionTitle}>채팅</div>
        <div className={styles.sectionContent}>
          <ChatSection
            messages={chatMessages}
            users={participants.map((p) => p.name)}
          />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
