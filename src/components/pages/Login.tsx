import type { JSX } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import GoogleLoginPage from "./GoogleLoginPage";
import KakaoLoginButton from "./KakaoLoginButton";

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleGoogleLogin = (): void => {
    console.log("Google 로그인 실행!");
    // 실제 로그인 로직 추가
  };

  const handleLogin = async (): Promise<void> => {
    if (!userId || !password) {
      alert("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://34.64.218.29:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userId,
          password,
        }),
      });

      const result = await response.json();

      if (result.isSuccess) {
        const { accessToken, email, username, address, profileImage, role } = result.data;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("email", email);
        localStorage.setItem("username", username);
        localStorage.setItem("address", address);
        localStorage.setItem("profileImage", profileImage);
        localStorage.setItem("role", role);

        alert(`${username}님, 로그인 성공!`);
        navigate("/main");
      } else {
        alert(result.errorCode?.message || "로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="Login_body">
      <div className="Login_box">
        <label className="Login_id">이메일</label>
        <input
          type="text"
          placeholder="이메일을 입력하세요."
          className="id_input"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <label className="Login_password">비밀번호</label>
        <input
          type="password"
          placeholder="••••••••"
          className="password_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div>
          <button className="Login_button" onClick={handleLogin}>
            로그인
          </button>
        </div>

        <button className="Login_find">비밀번호 찾기</button>
        <button className="Login_signup" onClick={() => navigate("/signup")}>
          회원가입
        </button>

        <div className="Login_social">
          <GoogleLoginPage onClick={handleGoogleLogin} />
          <KakaoLoginButton />
        </div>
      </div>
    </div>
  );
}

export default Login;
