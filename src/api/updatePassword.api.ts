import { api } from "./index";

interface UpdatePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordApiResponse {
  isSuccess: boolean;
  data: string;
  errorCode?: any;
}

export const updatePassword = async (
  currentPassword: string,
  newPassword: string,
  confirmPassword: string
): Promise<boolean> => {
  try {
    const payload: UpdatePasswordRequest = {
      currentPassword,
      newPassword,
      confirmPassword,
    };

    const res = await api.post<PasswordApiResponse>(
      "/api/myPage/v1/password/update",
      payload
    );

    console.log("🔐 비밀번호 변경 응답:", res.data);

    return res.data.isSuccess;
  } catch (error) {
    console.error("비밀번호 변경 중 오류 발생:", error);
    return false;
  }
};
