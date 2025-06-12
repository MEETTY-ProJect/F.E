import { api } from "./index";

// ✅ 스터디룸 타입 정의
export interface StudyRoom {
  id: number;
  roomName: string;
  currentMemberCount: number;
  hostNickname: string;
}

// ✅ 응답 타입 정의
interface MyStudyRoomsResponse {
  isSuccess: boolean;
  data: StudyRoom[];
  errorCode?: any;
}

// ✅ 내 스터디룸 목록 가져오기
export const getMyStudyRooms = async (): Promise<StudyRoom[]> => {
  const res = await api.get<MyStudyRoomsResponse>("/api/v1/board/my");
  console.log("내 스터디룸 목록: ", res.data.data);
  return res.data.data;
};
