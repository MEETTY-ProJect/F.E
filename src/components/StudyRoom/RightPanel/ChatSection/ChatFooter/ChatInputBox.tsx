import React, { useState } from "react";
import styles from "./ChatFooter.module.css";

interface ChatInputBoxProps {
  onSend: (message: string) => void;
}

const ChatInputBox = ({ onSend }: ChatInputBoxProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    console.log("작성한 메세지: ", input);
    onSend(input);
    setInput("");
  };

  return (
    <form className={styles.inputContainer} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="메시지를 입력해주세요."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={styles.inputBox}
      />
      <button type="submit" className={styles.sendButton}>
        전송
      </button>
    </form>
  );
};

export default ChatInputBox;
