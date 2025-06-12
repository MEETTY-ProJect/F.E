import React, { useEffect, useState, useRef } from "react";
import MessageItem from "./MessageItem";
import styles from "./MessageList.module.css";
import { useSmartScrollbar } from "../../../../../hooks/useSmartScrollbar";
import scrollStyles from "../../../../common/Scroll.module.css";
import { getChatMessages } from "../../../../../api/chat.api";
import { useParams } from "react-router-dom";
import defaultImage from "@assets/회사주세요.png";

interface Message {
  id: number;
  user: string;
  profile: string | null;
  content: string;
  time: string;
}

interface MessageListProps {
  users: string[];
}

const MessageList = (/*{ users }: MessageListProps*/) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { scrollRef, showScroll, handleWheel } = useSmartScrollbar();
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const isFetching = useRef(false);

  const fetchMessages = async () => {
    if (!roomId || isFetching.current || !hasMore) return;
    isFetching.current = true;

    try {
      const data = await getChatMessages(Number(roomId));

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      const transformed = data.map(
        (msg): Message => ({
          id: msg.messageId,
          user: msg.username,
          profile: msg.profileImage ?? defaultImage,
          content: msg.message,
          time: new Date(msg.createdAt).toLocaleTimeString("ko-KR", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
      );

      setMessages((prev) => [...transformed.reverse(), ...prev]);
    } catch (err) {
      console.error("메시지 불러오기 실패", err);
    } finally {
      isFetching.current = false;
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    if (scrollRef.current.scrollTop < 50 && hasMore) {
      fetchMessages();
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef, hasMore]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      onWheel={handleWheel}
      className={`${styles.messageList} ${scrollStyles.scrollBase} ${
        showScroll ? scrollStyles.scrollVisible : ""
      }`}
    >
      {messages.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888", marginTop: "1rem" }}>
          메시지가 없습니다.
        </p>
      ) : (
        messages.map((msg) => <MessageItem key={msg.id} message={msg} />)
      )}
    </div>
  );
};

export default MessageList;
