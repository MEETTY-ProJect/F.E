import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import "../modals/MainAlarm.css";

type Notification = {
  id: number;
  content: string;
  notificationType: "LOGIN" | "STUDY_JOIN_REQUEST" | "STUDY_CREATED" | string;
  url: string;
  createdAt: string;
};

function MainAlarm() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [modalOpen, setModalOpen] = useState(false); // 모달 표시 상태

  useEffect(() => {
    const jwt = localStorage.getItem("jwtToken");
    if (!jwt) {
      console.warn("JWT token not found!");
      return;
    }

    fetch("http://34.64.218.29:8080/api/notify/v1/notifications", {
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch notifications");
        return res.json();
      })
      .then((resData) => {
        // API에서 data 배열만 추출
        const data: Notification[] = resData.data || [];
        setNotifications(data);
      })
      .catch((err: unknown) => {
        console.error("Notification fetch error:", err);
      });

    const socket = new SockJS("http://34.64.218.29/ws?token=" + jwt);

    socket.onmessage = (e: MessageEvent) => {
      try {
        const message: Notification = JSON.parse(e.data);
        setNotifications((prev) => [message, ...prev]);
      } catch {
        console.error("Invalid message", e.data);
      }
    };

    socket.onclose = () => {
      console.log("SockJS disconnected");
    };

    socket.onerror = (err: Event) => {
      console.error("SockJS error", err);
    };

    return () => {
      socket.close();
    };
  }, []);

  // 알림 타입별 사용자 친화 메시지 반환
  const getNotificationMessage = (n: Notification): string => {
    switch (n.notificationType) {
      case "LOGIN":
        return "로그인되었습니다.";
      case "STUDY_CREATED":
        return "스터디방이 생성되었습니다.";
      case "STUDY_JOIN_REQUEST":
        return "스터디방 승인요청을 보냈습니다.";
      default:
        return n.content;
    }
  };

  const toggleModal = () => {
    setModalOpen((prev) => !prev);
  };

  return (
    <div
      className="main-alarm"
      role="button"
      tabIndex={0}
      onClick={toggleModal}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleModal();
        }
      }}
    >
      {/* modalOpen 상태가 true일 때만 모달 표시 */}
      {modalOpen && (
        <div className="alarm-modal">
          <h4>알림 목록</h4>
          <ul>
            {notifications.map((n) => (
              <li key={n.id} className={`notification-${n.notificationType.toLowerCase()}`}>
                <a href={n.url}>{getNotificationMessage(n)}</a>
                <span className="time">{new Date(n.createdAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MainAlarm;