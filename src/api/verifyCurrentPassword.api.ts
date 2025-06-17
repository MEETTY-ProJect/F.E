import { api } from "./index";

interface VerifyPasswordRequest {
  password: string;
}

interface VerifyPasswordResponse {
  isSuccess: boolean;
  data: string;
  errorCode?: any;
}

export const verifyCurrentPassword = async (
  password: string
): Promise<boolean> => {
  try {
    const payload: VerifyPasswordRequest = { password };
    const res = await api.post<VerifyPasswordResponse>(
      "/api/myPage/v1/password/verify",
      payload
    );
    console.log("🔐 비밀번호 확인 응답:", res.data);

    return res.data.isSuccess;
  } catch (error) {
    console.error("비밀번호 확인 중 오류 발생:", error);
    return false;
  }
};
