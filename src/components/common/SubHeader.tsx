import React from "react";
import styles from "./SubHeader.module.css";

const SubHeader: React.FC = () => {
  return (
    <div className={styles.subHeader}>
      <h2 className={styles.title}>내 스터디방</h2>
      <p className={styles.description}>
        오로지 방장인 스터디방과 승인 완료된 스터디방만 표시됩니다.
      </p>
    </div>
  );
};

export default SubHeader;
