import React from 'react';
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/SingUp.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  // 프로필 이미지 상태: 파일과 미리보기 URL 같이 저장
  const [profileImage, setProfileImage] = useState<{ file: File; url: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  // 파일 선택 시 호출되는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 기존에 있던 URL 해제(메모리 누수 방지)
      if (profileImage?.url) URL.revokeObjectURL(profileImage.url);

      const url = URL.createObjectURL(file);
      setProfileImage({ file, url });
    }
  };

  const handleSignUp = async () => {
    if (password !== passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
  
    const signUpDto = {
      email,
      password,
      username,
      address,
    };
  
    const formData = new FormData();
    formData.append(
      "signUpDto",
      new Blob([JSON.stringify(signUpDto)], { type: "application/json" })
    );
  
    if (profileImage?.file) {
      formData.append("profileImage", profileImage.file);
    }
  
    try {
      const response = await fetch("http://34.64.218.29:8080/api/auth/signUp", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.isSuccess) {
        alert("회원가입이 완료되었습니다!");
        navigate("/login");
      } else {
        const errorMessage =
          result.errorCode?.message || "회원가입에 실패했습니다.";
        alert(errorMessage);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert((error as Error).message || "회원가입 중 오류가 발생했습니다.");
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {/* 프로필 이미지 */}
        <label className="SignUp_profile">프로필 이미지</label>
        <div
          className={`profile ${profileImage ? "has-image" : ""}`}
          onClick={() => fileInputRef.current?.click()}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
        >
          {profileImage ? (
            <img
              src={profileImage.url}
              alt="프로필 이미지"
              className="profile-image"
            />
          ) : (
            <span></span>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation(); // 부모 onClick 이벤트 막기
              fileInputRef.current?.click();
            }}
            className="custom-file-label"
          >
            찾기
          </button>
        </div>

        {/* 숨겨진 파일 input */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

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