import React, { useState, useEffect } from "react";
import axios from "axios";

interface ApprovalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  room: {
    id: number;
    title: string;
    image: string;
    maxPeople: string;
    purpose: string;
    region: string;
    description: string;
  } | null;
}

const purposes = ["공부", "취미", "운동", "프로젝트"];
const regions = ["서울", "부산", "대전", "광주"];
const maxPeopleOptions = [4, 6, 8, 10];

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function ApprovalRequestModal({ isOpen, onClose, room }: ApprovalRequestModalProps) {
  const [randomPurpose, setRandomPurpose] = useState("");
  const [randomRegion, setRandomRegion] = useState("");
  const [randomMaxPeople, setRandomMaxPeople] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (room) {
      setRandomPurpose(getRandomItem(purposes));
      setRandomRegion(getRandomItem(regions));
      setRandomMaxPeople(getRandomItem(maxPeopleOptions));
    }
  }, [room]);

  if (!isOpen || !room) return null;

  const handleApprove = async (boardId: number, memberId: number) => {
    try {
      const response = await await axios.put(
        `http://34.64.218.29:8080/api/v1/board/${boardId}/members/${memberId}`,
        { status: "APPROVED" }, // 여기만 수정
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
          },
        }
      );
      console.log("Success:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  
  
  

  return (
    <div className="approval-overlay" onClick={onClose}>
      <div className="approval-modal-content" onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative", width: "450px", height: "150px" }}>
          <img
            src={room.image}
            alt={room.title}
            style={{ width: "100%", height: "100%", objectFit: "cover", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}
          />
          <p
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: "white",
              fontWeight: "bold",
              textShadow: "0 0 5px rgba(0,0,0,0.7)",
            }}
          >
            {room.title}
          </p>
        </div>

        <div className="approval-text">
          <div className="approval-info">
            <div className="approval-numberofpeople">스터디 정원</div>
            <div className="value">{randomMaxPeople}명</div>
          </div>
          <div className="approval-info">
            <div className="approval-purpose">목적</div>
            <div className="value">{randomPurpose}</div>
          </div>
          <div className="approval-info">
            <div className="approval-region">지역</div>
            <div className="value">{randomRegion}</div>
          </div>
        </div>

        <hr />

        <div className="approval-announcements">스터디 공지사항</div>
        <div className="approval-description">
          {room.description
            ? room.description.split("\n").map((line, idx) => <p key={idx}>{line}</p>)
            : ""}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="approval-buttons">
          <button className="approval-cancel-button" onClick={onClose} disabled={loading}>
            취소
          </button>
          <button className="approval-approval-button" onClick={(event) => {
    event.preventDefault(); // 필요한 경우
    handleApprove(43, 43);
  }}
  disabled={loading}> 승인 요청
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApprovalRequestModal;