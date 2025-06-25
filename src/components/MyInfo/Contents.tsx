// 📦 React & CSS
import React, { useEffect, useState } from "react";
import styles from "./Contents.module.css";

// 🧩 섹션 컴포넌트
import NicknameInput from "./NicknameInput";
import ProfileImageUploader from "./ProfileImageUploader";
import PasswordSection from "./PasswordSection";
import AddressSelector from "./AddressSelector";

// 🧾 모달 컴포넌트
import ResetConfirmModal from "./Modal/ResetConfirmModal";
import WithdrawalConfirmModal from "./Modal/WithdrawalConfirmModal";
import SaveConfirmModal from "./Modal/SaveConfirmModal";
import WithdrawalPasswordModal from "./Modal/WithdrawalPasswordModal";
import MessageModal from "../common/MessageModal";

// 📡 API 호출
import { getUserInfo } from "../../api/user.api";
import { type UserInfo, updateUserInfo } from "../../api/user.api";
import { withdrawAccount } from "../../api/withdrawal.api";

const Contents: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [formData, setFormData] = useState<UserInfo | null>(null);

  // 모달 상태
  const [showResetModal, setShowResetModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [error, setError] = useState<Error | null>(null);
  const [passwordForWithdrawal, setPasswordForWithdrawal] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserInfo();
        setUser(data);
        setFormData(data);
      } catch (err) {
        setError(err as Error);
        console.error("내 정보 가져오기 실패", err);
      }
    };

    fetchUser();
  }, []);

  // 초기화
  const handleReset = () => setShowResetModal(true);
  const handleResetConfirm = () => {
    setFormData(user);
    setShowResetModal(false);
    setMessageModal("모든 항목이 초기화되었습니다.");
  };
  const handleResetCancel = () => setShowResetModal(false);

  // 수정 요청
  const handleSave = () => setShowSaveModal(true);
  const handleSaveConfirm = async () => {
    setShowSaveModal(false);
    // post
    try {
      if (!formData) return;

      const payload = new FormData();

      const dto = {
        username: formData.username,
        address: formData.address,
        resetImage: formData.resetImage ?? false,
      };

      // ✅ JSON을 string으로 변환해서 append
      payload.append("updateUserDto", JSON.stringify(dto));

      // ✅ 이미지가 있을 때만 전송
      if (formData.profileImage) {
        payload.append("profileImage", formData.profileImage);
      }

      // payload.append("updatedUserInfo", JSON.stringify(dto));

      // ✅ "resetImage: true"일 땐 절대 이미지 전송하지 않기
      // if (!dto.resetImage && formData.profileImage instanceof File) {
      //   payload.append("profileImage", formData.profileImage);
      // }

      // for (const [key, value] of payload.entries()) {
      //   if (value instanceof Blob) {
      //     value
      //       .text()
      //       .then((text) => console.log("📦", key, "→ Blob contents:", text));
      //   } else {
      //     console.log("📦", key, "→", value);
      //   }
      // }

      // ✅ 이미지도 항상 전송 (string이든 File이든 일단 보내보기)
      // if (formData.profileImage instanceof File) {
      //   console.log("파일 이름:", formData.profileImage.name);
      //   console.log("파일 타입:", formData.profileImage.type);
      //   console.log("파일 크기:", formData.profileImage.size);
      //   payload.append("profileImage", formData.profileImage);
      // }

      const res = await updateUserInfo(payload);

      if (res.isSuccess && res) {
        const updateData = res.data;
        setUser(updateData);
        setFormData(updateData);
        setMessageModal("수정되었습니다.");
      } else {
        setMessageModal("수정에 실패했습니다.");
      }
    } catch (err) {
      console.error("수정 요청 실패:", err);
      setMessageModal("오류가 발생했습니다. 다시 시도해주세요.");
    }
  };
  const handleSaveCancel = () => setShowSaveModal(false);

  // 메시지 모달 닫기
  const handleMessageClose = () => {
    const shouldRedirect = messageModal === "탈퇴되었습니다.";

    setMessageModal(""); // 먼저 모달 닫기

    if (shouldRedirect) {
      // ✅ 모달이 닫히고 리렌더링된 다음 이동
      setTimeout(() => {
        window.location.href = "/login";
      }, 0); // 0ms도 충분. 렌더 사이클 뒤에 실행됨
    }
  };

  // 탈퇴
  const handleWithdrawal = () => setShowPasswordModal(true);
  const handlePasswordSuccess = (password: string) => {
    setPasswordForWithdrawal(password);
    setShowPasswordModal(false);
    setShowWithdrawalModal(true);
  };
  const handleWithdrawalConfirm = async () => {
    try {
      if (!passwordForWithdrawal) {
        setMessageModal("비밀번호가 없습니다.");
        setShowWithdrawalModal(false);
        return;
      }

      const isSuccess = await withdrawAccount(passwordForWithdrawal);

      if (isSuccess) {
        // ✅ 토큰 삭제
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // ✅ 리다이렉트 및 새로고침
        setMessageModal("탈퇴되었습니다.");
      } else {
        setMessageModal("탈퇴에 실패했습니다.");
      }
    } catch (err) {
      console.error("회원 탈퇴 중 오류:", err);
      setMessageModal("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setShowWithdrawalModal(false);
    }
  };
  const handleWithdrawalCancel = () => {
    setShowWithdrawalModal(false);
    setMessageModal("탈퇴 취소되었습니다.");
  };

  const handleImageChange = (file: File | null) => {
    if (file) {
      // 새 이미지 업로드
      const sanitizedFileName = file.name.replace(/\s+/g, "_");
      const sanitizedFile = new File([file], sanitizedFileName, {
        type: file.type,
      });
      setFormData((prev) =>
        prev
          ? { ...prev, profileImage: sanitizedFile, resetImage: false }
          : prev
      );
    } else {
      // 기본 이미지로 재설정
      setFormData((prev) =>
        prev ? { ...prev, profileImage: null, resetImage: true } : prev
      );
    }
  };

  return (
    <div className={styles.container}>
      {formData ? (
        <>
          {/* 프로필 이미지 섹션 */}
          <div className={styles.profileSection}>
            <ProfileImageUploader
              profileImage={formData.profileImage}
              onImageChange={handleImageChange}
            />
          </div>

          {/* 정보 입력 섹션 */}
          <div className={styles.formSection}>
            <p className={styles.email}>{formData.email}</p>

            <NicknameInput
              value={formData.username}
              onChange={(value) =>
                setFormData((prev) =>
                  prev ? { ...prev, username: value } : prev
                )
              }
            />

            <PasswordSection setMessage={setMessageModal} />

            <AddressSelector
              value={formData.address}
              onChange={(value) =>
                setFormData((prev) =>
                  prev ? { ...prev, address: value } : prev
                )
              }
            />

            <div className={styles.buttonGroup}>
              <button className={styles.resetButton} onClick={handleReset}>
                초기화
              </button>
              <button className={styles.saveButton} onClick={handleSave}>
                수정
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleWithdrawal}
              >
                탈퇴
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>로딩 중...</p>
      )}

      {showResetModal && (
        <ResetConfirmModal
          onConfirm={handleResetConfirm}
          onCancel={handleResetCancel}
        />
      )}

      {showSaveModal && (
        <SaveConfirmModal
          onConfirm={handleSaveConfirm}
          onCancel={handleSaveCancel}
        />
      )}

      {showPasswordModal && (
        <WithdrawalPasswordModal
          onSuccess={handlePasswordSuccess}
          onCancel={() => setShowPasswordModal(false)}
        />
      )}

      {showWithdrawalModal && (
        <WithdrawalConfirmModal
          onConfirm={handleWithdrawalConfirm}
          onCancel={handleWithdrawalCancel}
        />
      )}

      {messageModal && (
        <MessageModal message={messageModal} onClose={handleMessageClose} />
      )}
    </div>
  );
};

export default Contents;
