import { api } from "./index";

export interface UserInfo {
  email: string;
  username: string;
  address: string;
  profileImage: string | File | null;
  resetImage: boolean;
}

interface UserResponse {
  isSuccess: boolean;
  data: UserInfo;
}

interface EditResponse {
  isSuccess: boolean;
  message: string;
  data: UserInfo;
}

// ✅ 내 정보 가져오기
export const getUserInfo = async (): Promise<UserInfo> => {
  const res = await api.get<UserResponse>("/api/myPage/v1/me");
  console.log("내 정보: ", res.data.data);
  return res.data.data;
};

// ✅ 내 정보 수정하기
export const updateUserInfo = async (
  formData: FormData
): Promise<EditResponse> => {
  // for (const [key, value] of formData.entries()) {
  //   console.log("API FormData →", key, value);
  // }
  const res = await api.post<EditResponse>("/api/myPage/v1/me", formData);
  console.log("수정 결과: ", res.data);
  return res.data;
};
