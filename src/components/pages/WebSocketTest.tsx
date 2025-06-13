import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

// ✅ 메시지 타입 정의
interface ChatMessage {
  userId: string;
  content?: string;
  message?: string;
}

const WebSocketTest = () => {
  const [roomId, setRoomId] = useState<string>("2");
  const [userId, setUserId] = useState<string>("2");
  const [jwt, setJwt] = useState<string>("eyJhbGciOiJIUzI1NiJ9....");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState<string>("");

  const chatSocketRef = useRef<WebSocket | null>(null);
  const videoSocketRef = useRef<WebSocket | null>(null);

  // ✅ 과거 메시지 불러오기
  const fetchChatMessages = async () => {
    try {
      const response = await axios.get<{ data: ChatMessage[] }>(
        `http://34.64.218.29:8080/chat/rooms/${roomId}/messages`,
        {
          params: {
            limit: 30,
            lastMessageId: 99999999999,
          },
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      setChatMessages(response.data.data);
      console.log("서버 응답 데이터:", response.data);
    } catch (err) {
      console.error("채팅 내역 조회 실패", err);
      setChatMessages([]);
    }
  };

  // ✅ 소켓 연결
  const connectSockets = () => {
    if (!roomId || !userId || !jwt) {
      alert("roomId, userId, jwt를 모두 입력하세요");
      return;
    }

    fetchChatMessages();

    // 채팅 소켓 연결
    const chatSocket = new WebSocket(
      `ws://localhost:8080/chat?room=${roomId}&token=${jwt}`
    );
    chatSocketRef.current = chatSocket;

    chatSocket.onopen = () => {
      console.log("✅ 채팅 WebSocket 연결 성공");
    };

    chatSocket.onmessage = (event: MessageEvent) => {
      try {
        const message: ChatMessage = JSON.parse(event.data);
        console.log("📩 수신 메시지:", message);
        setChatMessages((prev) => [...prev, message]);
      } catch (err) {
        console.error("❌ 메시지 파싱 오류:", err);
      }
    };

    chatSocket.onerror = (err) => {
      console.error("❌ 채팅 WebSocket 에러", err);
    };

    chatSocket.onclose = () => {
      console.log("❌ 채팅 소켓 종료");
    };

    // 영상 소켓 연결
    const videoSocket = new WebSocket(
      `ws://34.64.218.29:3000/?roomId=${roomId}&peerId=${userId}&token=${jwt}`
    );
    videoSocketRef.current = videoSocket;

    videoSocket.onopen = () => {
      console.log("✅ 영상 WebSocket 연결 성공");
    };

    videoSocket.onerror = (err) => {
      console.error("❌ 영상 WebSocket 에러", err);
    };

    videoSocket.onclose = () => {
      console.log("❌ 영상 소켓 종료");
    };
  };

  // ✅ 메시지 전송
  const handleSendChat = () => {
    if (
      chatSocketRef.current &&
      chatSocketRef.current.readyState === WebSocket.OPEN
    ) {
      const message = { message: chatInput };
      chatSocketRef.current.send(JSON.stringify(message));
      setChatInput("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>🔥 스터디방 통합 테스트 🔥</h1>

      <div style={{ marginBottom: "20px" }}>
        <label>Room ID: </label>
        <input
          value={roomId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setRoomId(e.target.value)
          }
        />
        <br />

        <label>User ID: </label>
        <input
          value={userId}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserId(e.target.value)
          }
        />
        <br />

        <label>JWT: </label>
        <input
          value={jwt}
          size={80}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setJwt(e.target.value)
          }
        />
        <br />

        <button onClick={connectSockets}>소켓 연결하기</button>
      </div>

      <div>
        <h2>채팅</h2>
        <div
          style={{
            border: "1px solid #ccc",
            height: "300px",
            overflowY: "scroll",
            marginBottom: "10px",
          }}
        >
          {chatMessages.map((msg, idx) => (
            <div key={idx}>
              [{msg.userId}] {msg.content || msg.message}
            </div>
          ))}
        </div>

        <input
          value={chatInput}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setChatInput(e.target.value)
          }
          onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
        />
        <button onClick={handleSendChat}>전송</button>
      </div>
    </div>
  );
};

export default WebSocketTest;
