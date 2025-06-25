import React from "react";
import BaseManageModal from "../common/BaseManageModal";
import ManageTable from "../common/ManageTable";
import styles from "./MemberModal.module.css";

interface Member {
  id: number;
  nickname: string;
  lastVisitDate: string;
  lastVisitTime: string;
  totalTime: string;
}

const dummyMembers: Member[] = [
  {
    id: 1,
    nickname: "도구리",
    lastVisitDate: "2025-06-25",
    lastVisitTime: "13:30",
    totalTime: "4시간 20분",
  },
  {
    id: 2,
    nickname: "고래사랑",
    lastVisitDate: "2025-06-24",
    lastVisitTime: "18:10",
    totalTime: "6시간 12분",
  },
  {
    id: 3,
    nickname: "열공중",
    lastVisitDate: "2025-06-23",
    lastVisitTime: "11:00",
    totalTime: "2시간 45분",
  },
];

const MemberModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <BaseManageModal title="스터디 멤버 관리" onClose={onClose}>
      <ManageTable>
        <thead>
          <tr>
            <th>닉네임</th>
            <th>최근 접속 날짜</th>
            <th>최근 접속 시간</th>
            <th>누적 시간</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {dummyMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.nickname}</td>
              <td>{member.lastVisitDate}</td>
              <td>{member.lastVisitTime}</td>
              <td>{member.totalTime}</td>
              <td>⋯</td>
            </tr>
          ))}
        </tbody>
      </ManageTable>
    </BaseManageModal>
  );
};

export default MemberModal;
