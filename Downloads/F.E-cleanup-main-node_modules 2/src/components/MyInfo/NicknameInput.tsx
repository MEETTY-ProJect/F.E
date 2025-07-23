import React from "react";
import styles from "./NicknameInput.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const NicknameInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="nickname" className={styles.label}>
        닉네임
      </label>
      <input
        id="nickname"
        type="text"
        className={styles.input}
        placeholder="닉네임을 입력하세요 (20자 이내)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={20}
      />
    </div>
  );
};

export default NicknameInput;
