import React, { useState } from "react";
import styles from "./PasswordSection.module.css";
import PasswordVerifier from "./PasswordVerifier";
import NewPasswordInputs from "./NewPasswordInputs";
import { updatePassword } from "../../../api/updatePassword.api";

interface PasswordEditModalProps {
  onClose: () => void;
  onSuccess: () => void;
  setMessage: (msg: string) => void;
}

const PasswordEditModal = ({
  onClose,
  onSuccess,
  setMessage,
}: PasswordEditModalProps) => {
  const [verified, setVerified] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);

  const handleSubmit = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("모든 항목을 입력해주세요.");
      return;
    }

    const success = await updatePassword(
      currentPassword,
      newPassword,
      confirmPassword
    );

    if (success) {
      setMessage("비밀번호가 성공적으로 변경되었습니다.");
      onSuccess();
      onClose();
    } else {
      setMessage("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>비밀번호 수정</h3>

        <PasswordVerifier
          onSuccess={(password) => {
            setVerified(true);
            setCurrentPassword(password);
          }}
          disabled={verified}
        />

        {verified && (
          <NewPasswordInputs
            onChange={(pw, confirmPw, isMatch) => {
              setNewPassword(pw);
              setConfirmPassword(confirmPw);
              setPasswordsMatch(isMatch);
            }}
          />
        )}

        <div className={styles.modalButtons}>
          <button onClick={onClose} className={styles.cancelButton}>
            취소
          </button>
          <button
            onClick={handleSubmit}
            className={`${styles.confirmButton} ${
              passwordsMatch ? styles.active : ""
            }`}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordEditModal;
