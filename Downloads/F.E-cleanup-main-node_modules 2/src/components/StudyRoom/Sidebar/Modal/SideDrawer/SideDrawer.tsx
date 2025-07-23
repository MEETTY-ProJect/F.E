import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import styles from "./SideDrawer.module.css";

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function SideDrawer({
  isOpen,
  onClose,
  children,
}: SideDrawerProps) {
  // 모달 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <div className={`${styles.drawer} ${isOpen ? styles.open : ""}`}>
        {children}
      </div>
    </>
  );
}
