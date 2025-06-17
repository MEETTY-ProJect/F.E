import React from "react";
import styles from "./BaseConfirmModal.module.css";

interface Props {
  message: string;
  onClose: () => void;
}

const MessageModal: React.FC<Props> = ({ message, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>{message}</p>
        <div className={styles.buttons}>
          <button onClick={onClose}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
