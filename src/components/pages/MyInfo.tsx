import React from "react";
import SubHeader from "../common/SubHeader";
import Contents from "../MyInfo/Contents";
import styles from "./styles/MyInfo.module.css";

const MyInfo: React.FC = () => {
  return (
    <div className={styles.container}>
      <SubHeader />
      <Contents />
    </div>
  );
};

export default MyInfo;
