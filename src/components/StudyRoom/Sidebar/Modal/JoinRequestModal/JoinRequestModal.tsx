import React from "react";
import BaseManageModal from "../common/BaseManageModal";
import ManageTable from "../common/ManageTable";
import styles from "./JoinRequestModal.module.css";

interface RequestUser {
  id: number;
  nickname: string;
  requestTime: string;
}

const dummyRequests: RequestUser[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  nickname: `요청자${i + 1}`,
  requestTime: `2025-06-25 ${String(9 + (i % 10)).padStart(2, "0")}:${String(
    (i * 7) % 60
  ).padStart(2, "0")}`,
}));

const JoinRequestModal = ({ onClose }: { onClose: () => void }) => {
  const handleApprove = (id: number) => {
    console.log(`${id}번 요청 승인`);
  };

  const handleReject = (id: number) => {
    console.log(`${id}번 요청 거절`);
  };

  return (
    <BaseManageModal title="참가 요청 목록" onClose={onClose}>
      <ManageTable>
        <thead>
          <tr>
            <th>닉네임</th>
            <th>요청 시간</th>
            <th>승인</th>
            <th>거절</th>
          </tr>
        </thead>
        <tbody>
          {dummyRequests.map((user) => (
            <tr key={user.id}>
              <td>{user.nickname}</td>
              <td>{user.requestTime}</td>
              <td>
                <button
                  className={styles.approveBtn}
                  onClick={() => handleApprove(user.id)}
                >
                  승인
                </button>
              </td>
              <td>
                <button
                  className={styles.rejectBtn}
                  onClick={() => handleReject(user.id)}
                >
                  거절
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ManageTable>
    </BaseManageModal>
  );
};

export default JoinRequestModal;
