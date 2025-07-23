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
  messages: Message[];
  users: string[];
}

const ChatSection = ({
  messages: initialMessages,
  users,
}: ChatSectionProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [selectedDMUser, setSelectedDMUser] = useState<string | null>(null);

  const handleSend = (content: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString("ko-KR", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });

    const newMessage: Message = {
      id: Date.now(),
      user: "나",
      profile: null,
      content,
      time,
    };

    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className={styles.chatSection}>
      <div className={styles.messageArea}>
        <MessageList />
      </div>
      <ChatFooter
        users={users}
        selectedUser={selectedDMUser}
        onSelectUser={setSelectedDMUser}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatSection;
