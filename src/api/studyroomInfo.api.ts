// src/api/studyroom.api.ts
import { api } from "./index";

// ✅ 스터디룸 정보 타입 정의
export interface StudyRoomInfo {
  id: number;
  roomName: string;
  hostName: string;
  hostNickname: string;
  introduction: string;
  capacity: number;
  currentMemberCount: number;
  purpose: string; // 혹은 enum 처리해도 좋음
  region: string;
}

// ✅ 응답 타입 정의
interface StudyRoomResponse {
  isSuccess: boolean;
  data: StudyRoomInfo;
  errorCode?: any;
}

// ✅ 스터디룸 상세 정보 가져오기
export const getStudyRoomDetail = async (
  id: string
): Promise<StudyRoomInfo> => {
  const res = await api.get<StudyRoomResponse>(`/api/v1/board/${id}`);
  console.log(`📘 [스터디룸 ${id}] 상세 정보:`, res.data.data);
  return res.data.data;
};
