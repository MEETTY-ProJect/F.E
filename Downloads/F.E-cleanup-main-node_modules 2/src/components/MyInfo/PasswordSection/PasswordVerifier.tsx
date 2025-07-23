// components/MyInfo/PasswordSection/PasswordVerifier.tsx
import React, { useState } from "react";
import styles from "./PasswordSection.module.css";

interface PasswordVerifierProps {
  onSuccess: () => void;
  disabled?: boolean;
}

const PasswordVerifier: React.FC<PasswordVerifierProps> = ({
  onSuccess,
  disabled = false,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    try {
      // ❗ 실제 비밀번호 검증 API 요청으로 대체
      const isCorrect = password === "1234"; // 더미 검증
      if (isCorrect) {
        setError("");
        onSuccess();
      } else {
        setError("비밀번호가 일치하지 않습니다.");
      }
    } catch {
      setError("서버 오류가 발생했습니다.");
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
