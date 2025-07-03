import React from "react";
import styles from "./ConnectPanel.module.css";

interface Props {
  onConnect: () => void;
}

const ConnectPanel = ({ onConnect }: Props) => {
  return (
    <div className={styles.panel}>
      <p className={styles.message}>
        📹 <strong>화상채팅 기능을 사용하려면</strong> 카메라 및 마이크 사용에
        동의해야 합니다.
      </p>
      <button className={styles.button} onClick={onConnect}>
        동의하고 연결하기
      </button>
    </div>
  );
};

export default ConnectPanel;
