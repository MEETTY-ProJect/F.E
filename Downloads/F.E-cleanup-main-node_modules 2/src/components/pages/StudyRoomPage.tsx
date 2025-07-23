import React, { useEffect, useState } from "react";
import Header from "../StudyRoom/Header";
import Sidebar from "../StudyRoom/Sidebar";
import MainContent from "../StudyRoom/MainContent";
import RightPanel from "../StudyRoom/RightPanel";
import styles from "./styles/MyStudyRooms.module.css";
import { getStudyRoomDetail, StudyRoomInfo } from "../../api/studyroomInfo.api";
import { useParams } from "react-router";

const StudyRoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const [isOpen, setIsOpen] = useState(true);
  const [roomInfo, setRoomInfo] = useState<StudyRoomInfo | null>(null);

  const togglePanel = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const fetchRoomInfo = async () => {
      if (!roomId) return;
      try {
        const data = await getStudyRoomDetail(roomId);
        setRoomInfo(data);
      } catch (error) {
        console.error("스터디룸 정보를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchRoomInfo();
  }, [roomId]);

  if (!roomInfo) return <div>스터디룸 정보를 불러오는 중입니다...</div>;

  return (
    <div className={styles.container}>
      <Header isOpen={isOpen} onToggle={togglePanel} roomInfo={roomInfo} />

      <div className={styles.body}>
        <Sidebar roomInfo={roomInfo} />
        <MainContent />
        <RightPanel isOpen={isOpen} />
      </div>
    </div>
  );
};

export default StudyRoomPage;
