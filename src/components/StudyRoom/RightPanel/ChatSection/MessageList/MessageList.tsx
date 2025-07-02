import React, { useEffect, useState, useRef } from "react";
import MessageItem from "./MessageItem";
import styles from "./MessageList.module.css";
import { useSmartScrollbar } from "../../../../../hooks/useSmartScrollbar";
import scrollStyles from "../../../../common/Scroll.module.css";
import { getChatMessages } from "../../../../../api/chat.api";
import { useParams } from "react-router-dom";
import defaultImage from "@assets/회사주세요.png";

const MAX_SCROLL_TOP = 50;

interface Message {
  id: number;
  user: string;
  profile: string | null;
  content: string;
  time: string; // 표시용 (e.g. "14:32")
  timestamp: number; // 정렬용 (ms)
}

interface MessageListProps {
  newMessages: Message[];
}

const MessageList = ({ newMessages }: MessageListProps) => {
  const { roomId } = useParams<{ roomId: string }>();
  const { scrollRef, showScroll, handleWheel } = useSmartScrollbar();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isAtTopOnce, setIsAtTopOnce] = useState(false);

  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const isFetching = useRef(false);
  const fetchedTimestamps = useRef<Set<number>>(new Set());
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const shouldRestoreScroll = useRef(false);
  const prevScrollHeight = useRef(0);

  const fetchMessages = async () => {
    if (!roomId || isFetching.current || !hasMore) return;

    const sorted = [...messages].sort((a, b) => a.timestamp - b.timestamp);
    const oldest = sorted[0];
    const oldestId = oldest?.id ?? 999999999;
    const oldestTime = oldest?.timestamp ?? Date.now();

    if (fetchedTimestamps.current.has(oldestTime)) return;

    isFetching.current = true;
    prevScrollHeight.current = scrollRef.current?.scrollHeight ?? 0;
    shouldRestoreScroll.current = true;

    try {
      const data = await getChatMessages(Number(roomId), oldestId);

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      fetchedTimestamps.current.add(oldestTime);

      const transformed = data.map((msg): Message => {
        const date = new Date(msg.createdAt);
        return {
          id: msg.messageId,
          user: msg.username,
          profile: msg.profileImage ?? defaultImage,
          content: msg.message,
          time: date.toLocaleTimeString("ko-KR", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
          }),
          timestamp: date.getTime(),
        };
      });

      setMessages((prev) => {
        const combined = [...transformed, ...prev];
        const unique = new Map<number, Message>();
        combined.forEach((msg) => unique.set(msg.id, msg));
        return Array.from(unique.values()).sort(
          (a, b) => a.timestamp - b.timestamp
        );
      });
    } catch (err) {
      console.error("메시지 불러오기 실패", err);
    } finally {
      isFetching.current = false;
    }
  };

  useEffect(() => {
    if (shouldRestoreScroll.current) {
      setTimeout(() => {
        const ref = scrollRef.current;
        if (ref) {
          const newScrollHeight = ref.scrollHeight;
          ref.scrollTop = newScrollHeight - prevScrollHeight.current;
        }
        shouldRestoreScroll.current = false;
      }, 0);
    }
  }, [messages]);

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  const handleScroll = () => {
    const ref = scrollRef.current;
    if (!ref || isFetching.current || !hasMore) return;

    if (ref.scrollTop <= MAX_SCROLL_TOP) {
      if (!isAtTopOnce) {
        setIsAtTopOnce(true); // 첫 번째 도달: 대기 상태로 변경
      } else {
        fetchMessages(); // 두 번째 도달 시에만 불러오기
        setIsAtTopOnce(false);
      }
    } else {
      if (isAtTopOnce) setIsAtTopOnce(false);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll);
    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, [scrollRef, hasMore, isAtTopOnce]);

  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "auto" });
        setIsInitialLoad(false);
      }, 0);
    }
  }, [messages, isInitialLoad]);

  useEffect(() => {
    if (newMessages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [newMessages]);

  const allMessages = [...messages, ...newMessages].sort(
    (a, b) => a.timestamp - b.timestamp
  );

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
        allMessages.map((msg) => <MessageItem key={msg.id} message={msg} />)
      )}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessageList;
