import React, { useState } from "react";
import styles from "./ConfirmModal.module.css";

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
}

const WithdrawalPasswordModal: React.FC<Props> = ({ onConfirm, onCancel }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {};

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.inputGroup}>
          <label htmlFor="currentPassword">현재 비밀번호 확인</label>
          <div className={styles.inline}>
            <input
              id="currentPassword"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.verifyButton} onClick={handleVerify}>
              확인
            </button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </div>

        <div className={styles.buttons}>
          <button onClick={onConfirm}>확인</button>
          <button onClick={onCancel}>취소</button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawalPasswordModal;
