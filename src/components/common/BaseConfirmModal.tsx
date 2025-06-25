import React from "react";
import styles from "./BaseConfirmModal.module.css";

interface BaseConfirmModalProps {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  hideButtons?: boolean;
}

const BaseConfirmModal = ({
  children,
  onConfirm,
  onCancel,
}: BaseConfirmModalProps) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.children}>{children}</div>

        <div className={styles.buttons}>
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default BaseConfirmModal;
