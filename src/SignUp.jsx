import React from "react";
import "./SignUp.css";

function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordCheck, setPasswordCheck] = React.useState("");
  const [nickname, setNickname] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [profileImage, setProfileImage] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  // 이메일 인증 관련 상태
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);
  const [verificationCode, setVerificationCode] = React.useState("");
  const [serverCode, setServerCode] = React.useState("");
  const [codeSent, setCodeSent] = React.useState(false);

  const profileImages = [
    "/profileA.png",
    "/profileB.png",
    "/profileC.png",
  ];

  async function handleEmailVerification() {
    if (!email) {
      alert("이메일 인증을 해주세요!");
      return;
    }

    try {
      const response = await fetch("https://example.com/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error("인증 코드 전송 실패");

      const data = await response.json();
      alert("인증 코드가 이메일로 전송되었습니다.");
      setServerCode(data.code); // 실제 서비스에선 서버에서 검증
      setCodeSent(true);
    } catch (error) {
      console.error(error);
      alert("인증 요청 중 오류가 발생했습니다.");
    }
  }

  function verifyCode() {
    if (verificationCode === serverCode) {
      alert("이메일 인증이 완료되었습니다.");
      setIsEmailVerified(true);
    } else {
      alert("인증 코드가 일치하지 않습니다.");
    }
  }

  async function handleSignUp() {
    if (!isEmailVerified) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

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
      // 이미지 경로가 선택되었을 때
      if (typeof profileImage === "string") {
        formData.append("profileImageUrl", profileImage);
      } else {
        formData.append("profileImage", profileImage); // 파일 업로드
      }
    }

    try {
      const response = await fetch("https://example.com/api/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("회원가입 실패");

      const data = await response.json();
      console.log("회원가입 성공:", data);
      alert("회원가입이 완료되었습니다!");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  }

  return (
    <div className="SignUp_body">
      <div className="SignUp_box">
        <label className="SignUp_id">이메일</label>
        <input
          type="text"
          placeholder="이메일을 입력하세요."
          className="SignUp_id_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="SignUp_id_check" onClick={handleEmailVerification}>
          이메일 인증
        </button>

        {codeSent && (
          <>
            <input
              type="text"
              placeholder="인증 코드를 입력하세요"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              style={{ marginTop: "10px" }}
            />
            <button onClick={verifyCode}>코드 확인</button>
          </>
        )}

        <label className="SignUp_password">비밀번호</label>
        <input
          type="password"
          placeholder="••••••••"
          className="SignUp_password_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="SignUp_password_check">비밀번호 확인</label>
        <input
          type="password"
          placeholder="••••••••"
          className="SignUp_passwordcheck_input"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        <label className="SignUp_nickname">닉네임</label>
        <input
          type="text"
          placeholder="닉네임을 입력하세요."
          className="SignUp_nickname_input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label className="SignUp_profile">프로필 이미지</label>
          <div
            className={`profile ${profileImage ? "has-image" : ""}`}
            onClick={() => setIsModalOpen(true)}
          >
            {profileImage ? (
    <img
      src={profileImage}
      alt="프로필 이미지"
      className="profile-image"
    />
  ) : (
    <span></span>
  )}
          <button
            className="custom-file-label"
            onClick={() => setIsModalOpen(true)}
          >
            찾기
          </button>
        </div>

        {isModalOpen && (
          <div className="modal-backdrop">
            <div className="modal">
              <h3>프로필 이미지 선택</h3>
              <div
                className="image-grid"
                style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}
              >
                {profileImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`프로필 ${idx}`}
                    onClick={() => {
                      setProfileImage(src); // 이미지 경로 저장
                      setIsModalOpen(false); // 모달 닫기
                    }}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border: profileImage === src ? "3px solid #007bff" : "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: "10px" }}>
                <button className="modal_button" onClick={() => setIsModalOpen(false)}>닫기</button>
              </div>
            </div>
          </div>
        )}

        <div className="select-container">
          <label className="address">주소</label>
          <select
            id="address"
            className="custom-select"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          >
            <option value="">주소 선택</option>
            <option value="서울특별시">서울특별시</option>
            <option value="경기도">경기도</option>
            <option value="부산광역시">부산광역시</option>
            <option value="인천광역시">인천광역시</option>
            <option value="대전광역시">대전광역시</option>
            <option value="경상남도">경상남도</option>
            <option value="경상북도">경상북도</option>
          </select>
        </div>

        <button className="SignUp_button" onClick={handleSignUp}>
          회원가입
        </button>
      </div>
      </div>
  );
}

export default SignUp;
