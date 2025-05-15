import { useState } from "react";
import "../pages/SingUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [nickname, setNickname] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null); // 프로필 이미지 타입 변경
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
      } else {
        formData.append("profileImage", profileImage);
      }
    }

    try {
      const response = await fetch("https://your-backend.com/api/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("회원가입 실패");

      alert("회원가입이 완료되었습니다! 이메일을 인증해주세요!");
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="SignUp_body">
      <div className="SignUp_box">
        {/* 이메일 입력 */}
        <label className="SignUp_id">이메일</label>
        <input
          type="text"
          placeholder="이메일을 입력하세요."
          className="SignUp_id_input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* 비밀번호 */}
        <label className="SignUp_password">비밀번호</label>
        <input
          type="password"
          placeholder="••••••••"
          className="SignUp_password_input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* 비밀번호 확인 */}
        <label className="SignUp_password_check">비밀번호 확인</label>
        <input
          type="password"
          placeholder="••••••••"
          className="SignUp_passwordcheck_input"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />

        {/* 닉네임 */}
        <label className="SignUp_nickname">닉네임</label>
        <input
          type="text"
          placeholder="닉네임을 입력하세요."
          className="SignUp_nickname_input"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        {/* 프로필 이미지 */}
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
            type="button"
            onClick={() => setIsModalOpen(true)} // 프로필 이미지를 선택하는 모달 여는 버튼
          >
            찾기
          </button>
        </div>

        {/* 이미지 선택 모달 */}
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
                      setProfileImage(src);
                      setIsModalOpen(false); // 이미지 선택 후 모달 닫기
                    }}
                    style={{
                      width: "80px",
                      height: "80px",
                      borderRadius: "8px",
                      objectFit: "cover",
                      cursor: "pointer",
                      border:
                        profileImage === src
                          ? "3px solid #007bff"
                          : "1px solid #ccc",
                    }}
                  />
                ))}
              </div>
              <div style={{ marginTop: "10px" }}>
                <button
                  className="modal_button"
                  onClick={() => setIsModalOpen(false)} // 모달 닫기
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 주소 선택 */}
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

        {/* 회원가입 버튼 */}
        <button className="SignUp_button" onClick={handleSignUp}>
          회원가입
        </button>
      </div>
    </div>
  );
}

export default SignUp;