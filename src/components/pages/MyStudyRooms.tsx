import React from "react";
import SubHeader from "../common/SubHeader";
import Contents from "../MyStudyRooms/Contents";
import styles from "./MyPage.module.css";

const MyStudyRooms: React.FC = () => {
  return (
    <div className={styles.container}>
      <SubHeader
        title="내 스터디방"
        description="오로지 방장인 스터디방과 승인 완료된 스터디방만 표시됩니다."
      />
      <Contents />
    </div>
  );
};

export default MyStudyRooms;
