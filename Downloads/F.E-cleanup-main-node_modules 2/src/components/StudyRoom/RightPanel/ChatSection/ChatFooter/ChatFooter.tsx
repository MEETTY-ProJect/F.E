import React from "react";
import styles from "./ChatFooter.module.css";
import DMSelector from "./DMSelector";
import ChatInputBox from "./ChatInputBox";

interface ChatFooterProps {
  users: string[];
  selectedUser: string | null;
  onSelectUser: (user: string | null) => void;
  onSend: (message: string) => void;
}

const ChatFooter = ({
  users,
  selectedUser,
  onSelectUser,
  onSend,
}: ChatFooterProps) => {
  return (
    <div className={styles.footerContainer}>
      <DMSelector
        users={users}
        selectedUser={selectedUser}
        onSelect={onSelectUser}
      />
      <ChatInputBox onSend={onSend} />
    </div>
  );
};

export default ChatFooter;
