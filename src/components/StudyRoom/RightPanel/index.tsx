import React, { useState } from "react";
import ParticipantsList from "./ParticipantsList/ParticipantsList";
import ChatSection from "./ChatSection";
import styles from "./RightPanel.module.css";

import testProfileImage from "@assets/사회력소진짤.png";
import { useChatSocket } from "../../../hooks/useChatSocket";
import { useParams } from "react-router";

interface PanelProps {
  isOpen: boolean;
}

interface Message {
  id: number;
  user: string;
  profile: string | null;
  content: string;
  time: string;
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

const RightPanel = ({ isOpen }: PanelProps) => {
  const { roomId } = useParams<{ roomId: string }>();
  const token = localStorage.getItem("accessToken") || "";
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNewMessage = (data: any) => {
    const newMessage: Message = {
      id: data.messageId,
      user: data.username,
      profile: data.profileImage ?? null,
      content: data.message,
      time: new Date(data.createdAt).toLocaleTimeString("ko-KR", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    };

    setMessages((prev) =>
      prev.find((msg) => msg.id === newMessage.id)
        ? prev
        : [...prev, newMessage]
    );
  };

  const { sendMessage } = useChatSocket(roomId || "", token, handleNewMessage);

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
            users={participants.map((p) => p.name)}
            messages={messages}
            sendMessage={sendMessage}
            roomId={roomId || ""}
            token={token}
          />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;
