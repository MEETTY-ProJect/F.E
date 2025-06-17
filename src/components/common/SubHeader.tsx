import React from "react";
import styles from "./SubHeader.module.css";

interface SubHeaderProps {
  title: string;
  description: string;
}

const SubHeader = ({ title, description }: SubHeaderProps) => {
  return (
    <div className={styles.subHeader}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default SubHeader;
