import React, { useRef } from "react";
import styles from "./BaseManageModal.module.css";

interface BaseManageModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

const BaseManageModal = ({
  title,
  onClose,
  children,
}: BaseManageModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose(); // 바깥 클릭 시 닫기
    }
  };

  return (
    <div className={styles.overlay} onClick={handleClickOutside}>
      <div
        className={styles.modal}
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.header}>
          <h1>{title}</h1>
          <button onClick={onClose} className={styles.closeBtn}>
            ✕
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default BaseManageModal;
