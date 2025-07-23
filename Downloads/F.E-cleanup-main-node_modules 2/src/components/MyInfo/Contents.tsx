// components/MyInfo/Contents.tsx
import React, { useEffect, useState } from "react";
import styles from "./Contents.module.css";
import NicknameInput from "./NicknameInput";
import ProfileImageUploader from "./ProfileImageUploader";
import PasswordSection from "./PasswordSection";
import AddressSelector from "./AddressSelector";
import ResetConfirmModal from "./Modal/ResetConfirmModal";
import WithdrawalConfirmModal from "./Modal/WithdrawalConfirmModal";
import SaveConfirmModal from "./Modal/SaveConfirmModal";
import MessageModal from "./Modal/MessageModal";
import { getUserInfo } from "../../api/user.api";
import { type UserInfo, updateUserInfo } from "../../api/user.api";

const Contents: React.FC = () => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [formData, setFormData] = useState<UserInfo | null>(null);

  // 모달 상태
  const [showResetModal, setShowResetModal] = useState(false);
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [messageModal, setMessageModal] = useState("");
  const [error, setError] = useState<Error | null>(null);

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
      };

      payload.append("updateUserDto", JSON.stringify(dto));

      // ✅ 이미지도 항상 전송 (string이든 File이든 일단 보내보기)
      if (formData.profileImage instanceof File) {
        payload.append("profileImage", formData.profileImage);
      } else {
        payload.append("profileImage", ""); // ✅ 빈 문자열로 전송
      }

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
  const handleMessageClose = () => setMessageModal("");

  // 탈퇴
  const handleWithdrawal = () => setShowWithdrawalModal(true);
  const handleWithdrawalConfirm = () => {
    setShowWithdrawalModal(false);
    setMessageModal("탈퇴되었습니다.");
  };
  const handleWithdrawalCancel = () => {
    setShowWithdrawalModal(false);
    setMessageModal("취소되었습니다.");
  };

  const handleImageChange = (file: File) => {
    setFormData((prev) => (prev ? { ...prev, profileImage: file } : prev));
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

            <PasswordSection
              onPasswordChange={(newPassword) =>
                setFormData((prev) =>
                  prev ? { ...prev, password: newPassword } : prev
                )
              }
            />

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
