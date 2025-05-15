import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import "../pages/SingUp.css";
function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    const [nickname, setNickname] = useState("");
    const [address, setAddress] = useState("");
    const [profileImage, setProfileImage] = useState(null); // 프로필 이미지 타입 변경
    const [isModalOpen, setIsModalOpen] = useState(false);
    const profileImages = ["/profileA.png", "/profileB.png", "/profileC.png"];
    // ✅ 회원가입 요청
    const handleSignUp = async () => {
        if (password !== passwordCheck) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        formData.append("nickname", nickname);
        formData.append("address", address);
        if (profileImage) {
            if (typeof profileImage === "string") {
                formData.append("profileImageUrl", profileImage);
            }
            else {
                formData.append("profileImage", profileImage);
            }
        }
        try {
            const response = await fetch("https://your-backend.com/api/signup", {
                method: "POST",
                body: formData,
            });
            if (!response.ok)
                throw new Error("회원가입 실패");
            alert("회원가입이 완료되었습니다! 이메일을 인증해주세요!");
        }
        catch (error) {
            console.error("회원가입 오류:", error);
            alert("회원가입 중 오류가 발생했습니다.");
        }
    };
    return (_jsx("div", { className: "SignUp_body", children: _jsxs("div", { className: "SignUp_box", children: [_jsx("label", { className: "SignUp_id", children: "\uC774\uBA54\uC77C" }), _jsx("input", { type: "text", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD558\uC138\uC694.", className: "SignUp_id_input", value: email, onChange: (e) => setEmail(e.target.value) }), _jsx("label", { className: "SignUp_password", children: "\uBE44\uBC00\uBC88\uD638" }), _jsx("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "SignUp_password_input", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx("label", { className: "SignUp_password_check", children: "\uBE44\uBC00\uBC88\uD638 \uD655\uC778" }), _jsx("input", { type: "password", placeholder: "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022", className: "SignUp_passwordcheck_input", value: passwordCheck, onChange: (e) => setPasswordCheck(e.target.value) }), _jsx("label", { className: "SignUp_nickname", children: "\uB2C9\uB124\uC784" }), _jsx("input", { type: "text", placeholder: "\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD558\uC138\uC694.", className: "SignUp_nickname_input", value: nickname, onChange: (e) => setNickname(e.target.value) }), _jsx("label", { className: "SignUp_profile", children: "\uD504\uB85C\uD544 \uC774\uBBF8\uC9C0" }), _jsxs("div", { className: `profile ${profileImage ? "has-image" : ""}`, onClick: () => setIsModalOpen(true), children: [profileImage ? (_jsx("img", { src: profileImage, alt: "\uD504\uB85C\uD544 \uC774\uBBF8\uC9C0", className: "profile-image" })) : (_jsx("span", {})), _jsx("button", { className: "custom-file-label", type: "button", onClick: () => setIsModalOpen(true), children: "\uCC3E\uAE30" })] }), isModalOpen && (_jsx("div", { className: "modal-backdrop", children: _jsxs("div", { className: "modal", children: [_jsx("h3", { children: "\uD504\uB85C\uD544 \uC774\uBBF8\uC9C0 \uC120\uD0DD" }), _jsx("div", { className: "image-grid", style: { display: "flex", gap: "10px", flexWrap: "wrap" }, children: profileImages.map((src, idx) => (_jsx("img", { src: src, alt: `프로필 ${idx}`, onClick: () => {
                                        setProfileImage(src);
                                        setIsModalOpen(false); // 이미지 선택 후 모달 닫기
                                    }, style: {
                                        width: "80px",
                                        height: "80px",
                                        borderRadius: "8px",
                                        objectFit: "cover",
                                        cursor: "pointer",
                                        border: profileImage === src
                                            ? "3px solid #007bff"
                                            : "1px solid #ccc",
                                    } }, idx))) }), _jsx("div", { style: { marginTop: "10px" }, children: _jsx("button", { className: "modal_button", onClick: () => setIsModalOpen(false), children: "\uB2EB\uAE30" }) })] }) })), _jsxs("div", { className: "select-container", children: [_jsx("label", { className: "address", children: "\uC8FC\uC18C" }), _jsxs("select", { id: "address", className: "custom-select", value: address, onChange: (e) => setAddress(e.target.value), children: [_jsx("option", { value: "", children: "\uC8FC\uC18C \uC120\uD0DD" }), _jsx("option", { value: "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC", children: "\uC11C\uC6B8\uD2B9\uBCC4\uC2DC" }), _jsx("option", { value: "\uACBD\uAE30\uB3C4", children: "\uACBD\uAE30\uB3C4" }), _jsx("option", { value: "\uBD80\uC0B0\uAD11\uC5ED\uC2DC", children: "\uBD80\uC0B0\uAD11\uC5ED\uC2DC" }), _jsx("option", { value: "\uC778\uCC9C\uAD11\uC5ED\uC2DC", children: "\uC778\uCC9C\uAD11\uC5ED\uC2DC" }), _jsx("option", { value: "\uB300\uC804\uAD11\uC5ED\uC2DC", children: "\uB300\uC804\uAD11\uC5ED\uC2DC" }), _jsx("option", { value: "\uACBD\uC0C1\uB0A8\uB3C4", children: "\uACBD\uC0C1\uB0A8\uB3C4" }), _jsx("option", { value: "\uACBD\uC0C1\uBD81\uB3C4", children: "\uACBD\uC0C1\uBD81\uB3C4" })] })] }), _jsx("button", { className: "SignUp_button", onClick: handleSignUp, children: "\uD68C\uC6D0\uAC00\uC785" })] }) }));
}
export default SignUp;
