import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
    const [userId, setUserId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
  
    async function handleLogin() {
      try {
        const response = await fetch("https://example.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId, password }),
        });
  
        if (!response.ok) throw new Error("로그인 실패");
  
        const data = await response.json();
        console.log("로그인 성공:", data);
        localStorage.setItem("token", data.token);
        alert("로그인 성공!");
      } catch (error) {
        console.error("로그인 오류:", error);
        alert("아이디 또는 비밀번호가 틀렸습니다.");
      }
    }
  
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
          <button className="Login_google" onClick={() => navigate("/google-login")}>구글 로그인</button>
          <button className="Login_kakao" onClick={() => navigate("/kakao-login")}>카카오톡 로그인</button>
          <button
          className="Login_signup"
          onClick={() => navigate("/SignUp")}
          >
            회원가입
            </button>
        </div>
    </div>
    );
  }  

export default Login;