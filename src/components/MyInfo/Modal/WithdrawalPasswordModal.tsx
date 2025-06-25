import React, { useState } from "react";
import BaseConfirmModal from "../../common/BaseConfirmModal";
import styles from "./WithdrawalPasswordModal.module.css";
import { verifyCurrentPassword } from "../../../api/verifyCurrentPassword.api";

interface Props {
  onSuccess: (password: string) => void;
  onCancel: () => void;
}

const WithdrawalPasswordModal = ({ onSuccess, onCancel }: Props) => {
  const [step, setStep] = useState<"confirm" | "verify">("confirm");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (step === "confirm") {
      setStep("verify"); // 1단계 → 2단계 전환
      setError(""); // 이전 오류 초기화
    } else if (step === "verify") {
      const isValid = await verifyCurrentPassword(password);
      if (isValid) {
        onSuccess(password); // 3단계: 실제 탈퇴 진행
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    }
  };

  return (
    <BaseConfirmModal onConfirm={handleConfirm} onCancel={onCancel}>
      {step === "confirm" ? (
        <p className={styles.confirmMessage}>정말로 탈퇴하시겠습니까?</p>
      ) : (
        <div className={styles.verifyBox}>
          <label htmlFor="withdrawPassword">비밀번호 확인</label>
          <input
            id="withdrawPassword"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </BaseConfirmModal>
  );
};

export default WithdrawalPasswordModal;
