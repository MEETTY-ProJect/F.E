import React, { useEffect, useState } from "react";
import StudyRoomCard from "./StudyRoomCard";
import styles from "./StudyRoomList.module.css";
import { getMyStudyRooms } from "../../api/myStudyRoom.api";
import defaultImage from "@assets/회사주세요.png";

export interface StudyRoom {
  id: number;
  roomName: string;
  currentMemberCount: number;
  hostNickname: string;
}

const StudyRoomList: React.FC = () => {
  const [rooms, setRooms] = useState<StudyRoom[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getMyStudyRooms();
        setRooms(data);
      } catch (err: any) {
        setError("스터디룸 정보를 불러오는 데 실패했어요.");
      }
    };

    fetchRooms();
  }, []);

  if (error) return <p>{error}</p>;
  return (
    <div className={styles.studyRoomList}>
      {rooms.length === 0 ? (
        <p>참여 중인 스터디룸이 없습니다.</p>
      ) : (
        rooms.map((room) => (
          <StudyRoomCard
            key={room.id}
            id={room.id}
            title={room.roomName}
            memberCount={room.currentMemberCount}
            host={room.hostNickname}
            imgSrc={defaultImage} // ✅ 임시 이미지
          />
        ))
      )}
    </div>
  );
};

export default StudyRoomList;
