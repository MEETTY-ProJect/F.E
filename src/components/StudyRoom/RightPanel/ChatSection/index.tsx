import React, { useState } from "react";
import styles from "./ChatSection.module.css";
import ChatFooter from "./ChatFooter/ChatFooter";
import MessageList from "./MessageList/MessageList";

interface Message {
  id: number;
  user: string;
  profile: string | null;
  content: string;
  time: string;
}

interface ChatSectionProps {
  users: string[];
  messages: Message[];
  sendMessage: (message: { message: string }) => void;
  roomId: string;
  token: string;
}

const ChatSection = ({
  users,
  messages,
  sendMessage,
  roomId,
  token,
}: ChatSectionProps) => {
  const [DMUserList, setDMUserList] = useState<string | null>(null);

  return (
    <div className={styles.chatSection}>
      <div className={styles.messageArea}>
        <MessageList newMessages={messages} />
      </div>
      <ChatFooter
        users={users}
        DMUserList={DMUserList}
        onDMUserList={setDMUserList}
        sendMessage={(message) => sendMessage({ message: message })}
        roomId={roomId || ""}
        token={token}
      />
    </div>
  );
};

export default ChatSection;
