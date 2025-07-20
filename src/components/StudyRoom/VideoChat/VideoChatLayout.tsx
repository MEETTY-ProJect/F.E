import React from "react";
import styles from "./VideoChatLayout.module.css";
import dummyImage from "@assets/사회력소진짤.png";

// 더미 유저 배열 (테스트용)
const users = [
  ...Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `사용자${i + 1}`,
    image: dummyImage,
    isHost: i === 0,
  })),
  {
    id: 11,
    name: "고구마맛있엉12", // ✅ 추가된 사용자
    image: localStorage.getItem("profileImage") ?? dummyImage,
    isHost: false,
  },
];

// ✅ 열(column) 수 계산 함수
const getColumnCount = (count: number): number => {
  if (count === 1) return 1;
  if (count === 2) return 2; // 예외: 2명일 땐 2x1
  return Math.ceil(Math.sqrt(count));
};

// ✅ 행(row) 수 계산 함수
const getRowCount = (count: number, columns: number): number => {
  return Math.ceil(count / columns);
};

const VideoChatLayout = () => {
  const columnCount = getColumnCount(users.length);
  const rowCount = getRowCount(users.length, columnCount);
  const myName = localStorage.getItem("username");
  const hostName = "사용자2";

  const gridStyle = {
    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
    gridTemplateRows: `repeat(${rowCount}, 1fr)`,
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (a.name === myName) return -1;
    if (b.name === myName) return 1;
    return 0;
  });

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button className={styles.startButton}>스트리밍 시작</button>
      </div>

      <div className={styles.middle}>
        <div className={styles.grid} style={gridStyle}>
          {sortedUsers.map((user) => {
            const isMe = user.name === myName;

            const isHost = user.name === hostName;

            return (
              <div key={user.id} className={styles.videoBox}>
                <img
                  src={user.image}
                  alt={user.name}
                  className={styles.avatar}
                />

                <div
                  className={`${styles.userName} ${
                    isMe ? styles.highlight : styles.normal
                  }`}
                >
                  {isHost && <span className={styles.hostIcon}>👑</span>}
                  {user.name}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.bottom}>
        <button className={styles.controlButton}>🎤</button>
        <button className={styles.controlButton}>📷</button>
      </div>
    </div>
  );
};

export default VideoChatLayout;
