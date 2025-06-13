import React from "react";
import styles from "./ChatFooter.module.css";
import DMSelector from "./DMSelector";
import ChatInputBox from "./ChatInputBox";

interface ChatFooterProps {
  users: string[];
  DMUserList: string | null;
  onDMUserList: (user: string | null) => void;
  sendMessage: (msg: any) => void;
  roomId: string;
  token: string;
}

const ChatFooter = ({
  users,
  DMUserList,
  onDMUserList,
  sendMessage,
  roomId,
  token,
}: ChatFooterProps) => {
  return (
    <div className={styles.footerContainer}>
      <DMSelector
        users={users}
        DMUserList={DMUserList}
        onDMUserList={onDMUserList}
      />
      <ChatInputBox onSend={sendMessage} />
    </div>
  );
};

export default ChatFooter;
