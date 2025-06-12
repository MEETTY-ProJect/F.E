import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ExitStudyRoomModal.module.css";

interface ExitStudyRoomModalProps {
  onClose: () => void;
}

const ExitStudyRoomModal = ({ onClose }: ExitStudyRoomModalProps) => {
  const navigate = useNavigate();

  const handleConfirm = () => {
    navigate("/"); // 홈으로 이동
  };

  const handleOverlayClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 모달 안쪽 클릭 시 overlay로 이벤트 전파 방지
  };

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent} onClick={handleModalClick}>
        <p className={styles.message}>정말 스터디방에서 나가시겠습니까?</p>
        <div className={styles.buttons}>
          <button onClick={handleConfirm} className={styles.confirmBtn}>
            확인
          </button>
          <button onClick={onClose} className={styles.cancelBtn}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExitStudyRoomModal;
