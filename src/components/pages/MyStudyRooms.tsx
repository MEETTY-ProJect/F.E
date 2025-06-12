import React from "react";
import SubHeader from "../common/SubHeader";
import Contents from "../MyStudyRooms/Contents";
import styles from "./styles/MyStudyRooms.module.css";

const MyStudyRooms: React.FC = () => {
  return (
    <div className={styles.container}>
      <SubHeader />
      <Contents />
    </div>
  );
};

export default MyStudyRooms;
