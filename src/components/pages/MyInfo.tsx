import React from "react";
import SubHeader from "../common/SubHeader";
import Contents from "../MyInfo/Contents";
import styles from "./MyPage.module.css";

const MyInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <SubHeader
        title="내 정보"
        description="회원 정보를 확인하고 수정할 수 있습니다."
      />
      <Contents />
    </div>
  );
};

export default MyInfo;
