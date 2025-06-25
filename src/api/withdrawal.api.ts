import { api } from "./index";

interface WithdrawalRequest {
  password: string;
}

interface WithdrawalResponse {
  isSuccess: boolean;
  data: string;
  errorCode?: any;
}

export const withdrawAccount = async (password: string): Promise<boolean> => {
  try {
    const payload: WithdrawalRequest = { password };
    const res = await api.put<WithdrawalResponse>(
      "/api/auth/v1/withdrawal",
      payload
    );
    console.log("🧨 회원 탈퇴 응답:", res.data);

    return res.data.isSuccess;
  } catch (error) {
    console.error("회원 탈퇴 중 오류 발생:", error);
    return false;
  }
};
