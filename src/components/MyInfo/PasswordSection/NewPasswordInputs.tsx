// components/MyInfo/PasswordSection/NewPasswordInputs.tsx
import React, { useState, useEffect } from "react";
import styles from "./PasswordSection.module.css";

interface NewPasswordInputsProps {
  onChange: (newPassword: string) => void;
}

const NewPasswordInputs: React.FC<NewPasswordInputsProps> = ({ onChange }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (newPassword && confirmPassword && newPassword !== confirmPassword) {
      setError("새 비밀번호가 일치하지 않습니다.");
    } else {
      setError("");
    }
    onChange(newPassword);
  }, [newPassword, confirmPassword, onChange]);

  return (
    <div className={styles.block}>
      <div className={styles.inputGroup}>
        <label htmlFor="newPassword">새 비밀번호</label>
        <input
          id="newPassword"
          type="password"
          className={styles.input}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="confirmPassword">새 비밀번호 확인</label>
        <input
          id="confirmPassword"
          type="password"
          className={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

export default NewPasswordInputs;
