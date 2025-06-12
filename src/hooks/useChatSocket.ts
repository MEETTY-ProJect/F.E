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
      `ws://34.64.218.29:8080/chat?room=${roomId}&token=${token}`
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

    ws.onclose = () => {
      console.log("🔌 WebSocket 닫힘");
    };

    return () => {
      ws.close();
    };
  }, [roomId, token]);

  // 메시지 보낼 수 있게 함수 리턴
  const sendMessage = (msg: any) => {
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(msg));
    }
  };

  return { sendMessage };
}
