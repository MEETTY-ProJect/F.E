import React, { useState } from "react";
import styles from "./index.module.css";
// import cogImage from "@assets/cog-8-tooth.svg";
import cogImage from "../../../assets/cog-8-tooth.svg";
import clipboardImage from "@assets/clipboard.svg";
import closeImage from "@assets/x-mark.svg";
import userPlusImage from "@assets/user-plus.svg";

import StudyRoomSettingModal, {
  type StudyRoomValues,
} from "./Modal/StudyRoomSetting/StudyRoomSettingModal";
import MemberModal from "./Modal/MemberModal/MemberModal";
import JoinRequestModal from "./Modal/JoinRequestModal/JoinRequestModal";
import ExitConfirmModal from "./Modal/ExitConfirm/ExitConfirmModal";
import { StudyRoomInfo } from "../../../api/studyroomInfo.api";

interface SidebarProps {
  roomInfo: StudyRoomInfo;
}

type ModalType = "setting" | "member" | "approve" | "exit" | null;

export default function Sidebar({ roomInfo }: SidebarProps) {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleOpen = (modal: ModalType) => {
    setActiveModal((prev) => (prev === modal ? null : modal));
  };
  const handleClose = () => setActiveModal(null);
  const handleSave = (values: StudyRoomValues) => {
    console.log("저장할 값:", values);
    // API 호출출
    setActiveModal(null);
  };

  const handleDelete = () => {
    console.log("방 삭제!");
    // → 여기에서 삭제 API 호출
    setActiveModal(null);
  };

  return (
    <>
      {/* 아이콘 바 */}
      <div className={styles.sidebar}>
        <div className={styles.topIcons}>
          <button
            className={styles.iconButton}
            onClick={() => handleOpen("setting")}
          >
            <img src={cogImage} alt="설정" />
          </button>
          <button
            className={styles.iconButton}
            onClick={() => handleOpen("member")}
          >
            <img src={clipboardImage} alt="멤버" />
          </button>
          <button
            className={styles.iconButton}
            onClick={() => handleOpen("approve")}
          >
            <img src={userPlusImage} alt="승인요청" />
          </button>
        </div>
        <div className={styles.bottomIcons}>
          <button
            className={styles.iconButton}
            onClick={() => handleOpen("exit")}
          >
            <img src={closeImage} alt="나가기" />
          </button>
        </div>
      </div>

      {/* SideDrawer + 모달 컨텐츠 */}

      {activeModal === "setting" && (
        <StudyRoomSettingModal
          isOpen={true} // 모달 자체는 드로어 안에서만 렌더
          initialValues={roomInfo}
          onCancel={handleClose} // 취소 버튼 클릭 시
          onSave={handleSave} // 저장 버튼 클릭 시
          onDelete={handleDelete} // 삭제 버튼 클릭 시
        />
      )}
      {activeModal === "member" && <MemberModal onClose={handleClose} />}
      {activeModal === "approve" && <JoinRequestModal onClose={handleClose} />}
      {activeModal === "exit" && <ExitConfirmModal onClose={handleClose} />}
    </>
  );
}
