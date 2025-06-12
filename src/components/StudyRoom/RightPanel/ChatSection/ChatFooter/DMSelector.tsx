import React from "react";
import styles from "./ChatFooter.module.css";

interface DMSelectorProps {
  users: string[];
  DMUserList: string | null;
  onDMUserList: (user: string | null) => void;
}

const DMSelector = ({ users, DMUserList, onDMUserList }: DMSelectorProps) => {
  return (
    <select
      className={styles.selectBox}
      value={DMUserList ?? ""}
      onChange={(e) => onDMUserList(e.target.value || null)}
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
