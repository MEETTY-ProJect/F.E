import React from "react";
import styles from "./ConfirmModal.module.css";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const SaveConfirmModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>정말 수정하시겠습니까?</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default SaveConfirmModal;
