import React from "react";
import styles from "./MessageList.module.css";
import defaultImage from "@assets/회사주세요.png";

interface Message {
  id: number;
  user: string;
  profile: string | null;
  content: string;
  time: string;
}

interface MessageItemProps {
  message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
  const { user, profile, content, time } = message;
  return (
    <div className={styles.messageItem}>
      <div className={styles.topContent}>
        <div className={styles.leftTop}>
          <img
            src={profile ?? "/default-profile.png"}
            alt="profile"
            className={styles.profile}
          />
          <span className={styles.username}>{user}</span>
        </div>
        <span className={styles.time}>{time}</span>
      </div>
      <div className={styles.text}>{content}</div>
    </div>
  );
};

export default MessageItem;
