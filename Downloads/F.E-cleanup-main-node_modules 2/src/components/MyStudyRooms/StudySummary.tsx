import React from "react";
import styles from "./StudySummary.module.css";

const StudySummary: React.FC = () => {
  return (
    <div className={styles.studySummary}>
      <p className={styles.label}>공부 누적 시간</p>
      <h3 className={styles.time}>102 : 15 : 58</h3>
    </div>
  );
};

export default StudySummary;
