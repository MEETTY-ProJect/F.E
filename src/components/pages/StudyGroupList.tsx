

export interface StudyGroup {
  id: number;
  roomName: string;
  currentMemberCount: number;
  hostNickname: string;
}

export interface StudyGroupResponse {
  studyGroups: StudyGroup[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  pageSize: number;
}

export async function fetchStudyRooms({
  roomName,
  purpose,
  region,
  page,
  size,
}: {
  roomName: string;
  purpose: string;
  region: number;
  page: number;
  size: number;
}): Promise<StudyGroupResponse> {
  const url = `http://34.64.218.29:8080/api/v1/board?roomName=${encodeURIComponent(
    roomName
  )}&purpose=${purpose}&region=${region}&page=${page}&size=${size}`;

  const response = await fetch(url);
  const json = await response.json();

  if (!json.isSuccess) {
    throw new Error("스터디 목록을 가져오는 데 실패했습니다.");
  }

  return json.data;
}
