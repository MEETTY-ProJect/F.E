import  { JSX, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css";
import GoogleSignUpButton from './GoogleSignUpButton';
import KakaoLoginButton from './KakaoLoginButton';

function Login(): JSX.Element {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleGoogleLogin = () => {
    console.log("Google 로그인 실행!");
    // 실제 로그인 로직 추가
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const fakeToken = "FAKE_TEST_TOKEN";
      localStorage.setItem("token", fakeToken);
      alert("로그인 성공! (가짜 로그인)");
      navigate("/main");
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("아이디 또는 비밀번호가 틀렸습니다.");
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
        <button
          className="Login_signup"
          onClick={() => navigate("/signup")}
        >
          회원가입
        </button>

        {/* ▶ 소셜 로그인 버튼들 */}
        <div className="Login_social">
          <GoogleSignUpButton onClick={handleGoogleLogin} />
          <KakaoLoginButton />
        </div>
      </div>
    </div>
  );
}

export default Login;