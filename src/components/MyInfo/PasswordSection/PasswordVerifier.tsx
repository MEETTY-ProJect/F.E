import React, { useState } from "react";
import styles from "./PasswordSection.module.css";
import { verifyCurrentPassword } from "../../../api/verifyCurrentPassword.api";

interface PasswordVerifierProps {
  onSuccess: (password: string) => void; // ✅ password 전달
  disabled?: boolean;
}

const PasswordVerifier: React.FC<PasswordVerifierProps> = ({
  onSuccess,
  disabled = false,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    const isCorrect = await verifyCurrentPassword(password);
    if (isCorrect) {
      setError("");
      onSuccess(password); // ✅ 인자 전달 필수
    } else {
      setError("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className={styles.block}>
      <div className={styles.inputGroup}>
        <label htmlFor="currentPassword">현재 비밀번호 확인</label>
        <div className={styles.inline}>
          <input
            id="currentPassword"
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={disabled}
          />
          <button
            className={styles.verifyButton}
            onClick={handleVerify}
            disabled={disabled}
          >
            확인
          </button>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default PasswordVerifier;
