import React from "react";
import styles from "./ChatFooter.module.css";

interface DMSelectorProps {
  users: string[];
  selectedUser: string | null;
  onSelect: (user: string | null) => void;
}

const DMSelector = ({ users, selectedUser, onSelect }: DMSelectorProps) => {
  return (
    <select
      className={styles.selectBox}
      value={selectedUser ?? ""}
      onChange={(e) => onSelect(e.target.value || null)}
    >
      <option value="">전체</option>
      {users.map((user) => (
        <option key={user} value={user}>
          {user}
        </option>
      ))}
    </select>
  );
};

export default DMSelector;
