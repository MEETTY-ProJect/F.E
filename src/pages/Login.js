import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/Login.css";
import GoogleSignUpButton from './GoogleSignUpButton';
import KakaoLoginButton from './KakaoLoginButton';
function Login() {
    const navigate = useNavigate();
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const handleGoogleLogin = () => {
        console.log("Google 로그인 실행!");
        // 실제 로그인 로직 추가
    };
    const handleLogin = async () => {
        try {
            const fakeToken = "FAKE_TEST_TOKEN";
            localStorage.setItem("token", fakeToken);
            alert("로그인 성공! (가짜 로그인)");
            navigate("/main");
        }
        catch (error) {
            console.error("로그인 오류:", error);
            alert("아이디 또는 비밀번호가 틀렸습니다.");
        }
    };
    return (_jsx("div", { className: "Login_body", children: _jsxs("div", { className: "Login_box", children: [_jsx("label", { className: "Login_id", children: "\uC774\uBA54\uC77C" }), _jsx("input", { type: "text", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694.", className: "id_input", value: userId, onChange: (e) => setUserId(e.target.value) }), _jsx("label", { className: "Login_password", children: "\uBE44\uBC00\uBC88\uD638" }), _jsx("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "password_input", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("div", { children: _jsx("button", { className: "Login_button", onClick: handleLogin, children: "\uB85C\uADF8\uC778" }) }), _jsx("button", { className: "Login_find", children: "\uBE44\uBC00\uBC88\uD638 \uCC3E\uAE30" }), _jsx("button", { className: "Login_signup", onClick: () => navigate("/signup"), children: "\uD68C\uC6D0\uAC00\uC785" }), _jsxs("div", { className: "Login_social", children: [_jsx(GoogleSignUpButton, { onClick: handleGoogleLogin }), _jsx(KakaoLoginButton, {})] })] }) }));
}
export default Login;
