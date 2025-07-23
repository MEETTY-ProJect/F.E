import React from "react";
import styles from "./ConfirmModal.module.css";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const ResetConfirmModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>모든 정보를 초기화하시겠습니까?</p>
        <div className={styles.buttons}>
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default ResetConfirmModal;
