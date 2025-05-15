import './KakaoLoginButton.css';

function KakaoLoginButton() {
  const handleLogin = () => {
    // 여기에 카카오 로그인 로직을 추가하세요.
    // 예: window.Kakao.Auth.login({...});
  };

  return (
    <button className="kakao-login-button" onClick={handleLogin}>
      <img
        src="/kakao_login.png"
        alt="Kakao symbol"
        className="kakao-login-icon"
      />
    </button>
  );
}

export default KakaoLoginButton;