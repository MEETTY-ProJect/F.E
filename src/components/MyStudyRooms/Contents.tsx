import React from "react";
import StudySummary from "./StudySummary";
import StudyRoomList from "./StudyRoomList";
import styles from "./Contents.module.css";

const Contents: React.FC = () => {
  return (
    <main className={styles.contents}>
      <StudySummary />
      <StudyRoomList />
    </main>
  );
};

export default Contents;
