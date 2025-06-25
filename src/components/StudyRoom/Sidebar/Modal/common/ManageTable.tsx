import React from "react";
import styles from "./ManageTable.module.css";

interface ManageTableProps {
  children: React.ReactNode;
}

const ManageTable = ({ children }: ManageTableProps) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>{children}</table>
    </div>
  );
};

export default ManageTable;
