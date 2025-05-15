import { jsx as _jsx } from "react/jsx-runtime";
import './KakaoLoginButton.css';
function KakaoLoginButton() {
    const handleLogin = () => {
        // 여기에 카카오 로그인 로직을 추가하세요.
        // 예: window.Kakao.Auth.login({...});
    };
    return (_jsx("button", { className: "kakao-login-button", onClick: handleLogin, children: _jsx("img", { src: "/kakao_login.png", alt: "Kakao symbol", className: "kakao-login-icon" }) }));
}
export default KakaoLoginButton;
