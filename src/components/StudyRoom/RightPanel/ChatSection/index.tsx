import React, { useState } from "react";
import styles from "./ChatSection.module.css";
import { useChatSocket } from "../../../../hooks/useChatSocket";
import ChatFooter from "./ChatFooter/ChatFooter";
import MessageList from "./MessageList/MessageList";
import { useParams } from "react-router";

interface Message {
  id: number;
  user: string;
  profile: string | null;
  content: string;
  time: string;
}

interface ChatSectionProps {
  users: string[];
}

const ChatSection = ({ users }: ChatSectionProps) => {
  const [DMUserList, setDMUserList] = useState<string | null>(null);
  const { roomId } = useParams<{ roomId: string }>();
  const token = localStorage.getItem("token") || "";
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

    setMessages((prev) => {
      if (prev.find((msg) => msg.id === newMessage.id)) return prev;
      return [...prev, newMessage];
    });
  };

  const { sendMessage } = useChatSocket(roomId || "", token, handleNewMessage);

  return (
    <div className={styles.chatSection}>
      <div className={styles.messageArea}>
        <MessageList newMessages={messages} />
      </div>
      <ChatFooter
        users={users}
        DMUserList={DMUserList}
        onDMUserList={setDMUserList}
        sendMessage={sendMessage}
        roomId={roomId || ""}
        token={token}
      />
    </div>
  );
};

export default ChatSection;
