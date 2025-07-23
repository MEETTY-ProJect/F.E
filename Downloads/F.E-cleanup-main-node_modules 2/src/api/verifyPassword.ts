import axios from "axios";

interface VerifyPasswordResponse {
  isSuccess: boolean;
  errorCode?: {
    name: string;
    httpStatus: string;
    message: string;
  };
  data?: string;
}

export const verifyPassword = async (
  password: string
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await axios.post<VerifyPasswordResponse>(
      "/auth/password/verify",
      { password }
    );

    if (response.data.isSuccess) {
      return { success: true };
    } else {
      return {
        success: false,
        message: response.data.errorCode?.message || "비밀번호 확인 실패",
      };
    }
  } catch {
    return {
      success: false,
      message: "서버 오류가 발생했습니다.",
    };
  }
};
