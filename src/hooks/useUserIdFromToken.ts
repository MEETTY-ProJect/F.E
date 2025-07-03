import { useMemo } from "react";
import { decode } from "js-base64";

interface DecodedToken {
  userId: number;
}

export const useUserIdFromToken = (token: string | null) => {
  return useMemo(() => {
    if (!token) return null;

    try {
      const payload = token.split(".")[1]; // JWT의 중간 부분
      const decodedPayload = decode(payload); // base64 디코딩
      const payloadObject = JSON.parse(decodedPayload) as DecodedToken;
      return String(payloadObject.userId);
    } catch (err) {
      console.warn("[useUserIdFromToken] 잘못된 JWT입니다.", err);
      return null;
    }
  }, [token]);
};
