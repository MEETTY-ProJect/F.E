import React, { useState } from "react";
import "./ChatLayout.css";
import Polling from "./Polling";
import { messages } from "../../../data/mockData";
import type { Message } from "../../../data/mockData";

const fetchMessages = async (): Promise<Message[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(messages);
    }, 500);
  });
};

const ChatLayout: React.FC = () => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      messages.push({ id: messages.length + 1, content: input });
      setInput("");
    }
  };

  return (
    <div className="chat-layout">
      <div className="chat-header">Chat Room</div>
      <Polling fetchMessages={fetchMessages} />
      <div className="chat-input-wrapper">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chat-input"
          placeholder="메시지를 입력하세요..."
        />
        <button onClick={handleSend} className="send-button">
          전송
        </button>
      </div>
    </div>
  );
};

export default ChatLayout;
