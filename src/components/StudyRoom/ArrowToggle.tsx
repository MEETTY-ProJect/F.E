import React, { useState } from "react";
import arrowDown from "@assets/chevron-down.svg";
import styles from "./ArrowToggle.module.css";

interface ArrowToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const ArrowToggle = ({ isOpen, onClick }: ArrowToggleProps) => {
  return (
    <>
      <img
        src={arrowDown}
        alt="화살표"
        className={`${styles.arrowIcon} ${
          isOpen ? styles.flipDown : styles.flipUp
        }`}
        onClick={onClick}
      />
    </>
  );
};

export default ArrowToggle;
