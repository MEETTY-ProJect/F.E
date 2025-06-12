// src/api/chat.ts
import { api } from "./index";

// ✅ 메시지 타입 정의
export interface ChatMessage {
  messageId: number;
  roomId: number;
  userId: number;
  username: string;
  profileImage: string | null;
  message: string;
  createdAt: string;
}

// ✅ 응답 타입 정의
interface ChatMessagesResponse {
  isSuccess: boolean;
  data: ChatMessage[];
  errorCode?: any;
}

// ✅ 특정 스터디룸의 과거 메시지 목록 가져오기 (lastMessageId 이후부터)
export const getChatMessages = async (
  roomId: number,
  lastMessageId: number,
  limit: number = 30
): Promise<ChatMessage[]> => {
  console.log("lastMessageId: ", lastMessageId);
  const res = await api.get<ChatMessagesResponse>(
    `/chat/rooms/${roomId}/messages`,
    {
      params: {
        limit,
        // lastMessageId,
      },
    }
  );
  console.log(`💬 [${roomId}]번 방 메시지 목록:`, res.data.data);
  return res.data.data;
};
