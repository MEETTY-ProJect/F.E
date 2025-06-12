import React, { useEffect, useState, useRef } from "react";
import "./ChatLayout.css";
import type { Message } from "../../../data/mockData";

interface PollingProps {
  fetchMessages: () => Promise<Message[]>;
}

const Polling: React.FC<PollingProps> = ({ fetchMessages }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newMessages = await fetchMessages();
      setMessages(newMessages);
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="polling-container">
      {messages.map((msg) => (
        <div key={msg.id} className="message-item">
          {msg.content}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Polling;
