import React from "react";
import styles from "./ParticipantsList.module.css";
import defaultImage from "@assets/회사주세요.png";

interface Participant {
  name: string;
  profile?: string | null;
  isLeader: boolean;
}

interface ParticipantsListProps {
  participants: Participant[];
}

const ParticipantsList = ({ participants }: ParticipantsListProps) => {
  return (
    <div className={styles.list}>
      {participants.map((p, idx) => (
        <div key={idx} className={styles.participant}>
          <div className={styles.leftContent}>
            <img
              src={p.profile ? p.profile : defaultImage}
              alt={`${p.name}의 프로필`}
              className={styles.profileImage}
            />
            <div
              className={`${styles.nickname} ${
                p.isLeader ? styles.leader : ""
              }`}
            >
              {p.isLeader && <span>👑 </span>}
              {p.name}
            </div>
          </div>
          <div className={styles.rightContent}>
            <button>•••</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ParticipantsList;
