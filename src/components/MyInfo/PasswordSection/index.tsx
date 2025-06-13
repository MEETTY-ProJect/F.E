import React, { useState } from "react";
import styles from "./PasswordSection.module.css";
import PasswordEditModal from "./PasswordEditModal";

interface PasswordSectionProps {
  setMessage: (msg: string) => void;
}

const PasswordSection = ({ setMessage }: PasswordSectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  const handleSuccess = () => {
    setIsChanged(true);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.block}>
      <label>비밀번호</label>
      <div className={styles.inline}>
        <input
          type="password"
          value={isChanged ? "비밀번호가 수정되었습니다" : "********"}
          readOnly
          className={styles.input}
        />
        <button
          className={styles.verifyButton}
          onClick={() => setIsModalOpen(true)}
        >
          수정
        </button>
      </div>

      {isModalOpen && (
        <PasswordEditModal
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
          setMessage={setMessage}
        />
      )}
    </div>
  );
};

export default PasswordSection;
