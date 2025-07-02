import { useEffect, useRef } from "react";

export function useChatSocket(
  roomId: string,
  token: string,
  onMessage: (msg: any) => void
) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!roomId || !token) return;

    const ws = new WebSocket(
      `ws://34.22.72.174:8080/chat?room=${roomId}&token=${token}`
    );
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("✅ WebSocket 연결됨");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data); // 메시지 처리 로직은 외부에서 넣게 함
    };

    ws.onerror = (err) => {
      console.error("❌ WebSocket 에러", err);
    };

    ws.onclose = (event) => {
      console.log("🔌 WebSocket 닫힘");
      console.log("🔹 code:", event.code);
      console.log("🔹 reason:", event.reason);
      console.log("🔹 wasClean:", event.wasClean);
    };

    return () => {
      ws.close();
    };
  }, [roomId, token]);

  // 메시지 보낼 수 있게 함수 리턴
  const sendMessage = (msg: any) => {
    console.log("sendMessage: ", msg);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      console.log("socket message: ");
      socketRef.current.send(JSON.stringify(msg));
    }
  };

  return { sendMessage };
}
