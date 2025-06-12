import { useState } from "react";
import styles from "./StudyRoomSettingModal.module.css";
import SideDrawer from "../SideDrawer/SideDrawer";

import defaultProfileImage from "@assets/사회력소진짤.png";

const regions = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

const purposes = [
  "🎓 학업/자격증",
  "💼 취업/면접",
  "💻 개발/프로그래밍",
  "🌐 외국어",
  "📚 자기계발",
  "🎨 취미/예술",
];

export interface StudyRoomValues {
  name: string;
  description: string;
  profileImageUrl?: string;
  maxMembers: number;
  purpose: string;
  region?: string;
}

interface Props {
  isOpen: boolean;
  initialValues: StudyRoomValues;
  onCancel: () => void;
  onSave: (values: StudyRoomValues) => void;
  onDelete: () => void;
}

export function StudyRoomSettingsModal({
  isOpen,
  initialValues,
  onCancel,
  onSave,
  onDelete,
}: Props) {
  const [values, setValues] = useState<StudyRoomValues>(initialValues);

  const [previewImage, setPreviewImage] = useState<string | undefined>(
    initialValues.profileImageUrl || defaultProfileImage
  );

  const handleChange = <K extends keyof StudyRoomValues>(
    key: K,
    v: StudyRoomValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [key]: v }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setPreviewImage(reader.result); // 미리보기 이미지 변경
        handleChange("profileImageUrl", reader.result); // 필요 시 저장
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <SideDrawer isOpen={isOpen} onClose={onCancel}>
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
            onSave(values);
          }}
        >
          <div className={styles.field}>
            <label htmlFor="name" className={styles.label}>
              스터디방 이름
            </label>
            <input
              id="name"
              className={styles.input}
              type="text"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="description" className={styles.label}>
              설명
            </label>
            <textarea
              id="description"
              className={styles.textarea}
              value={values.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="profileImageUrl" className={styles.label}>
              프로필 이미지 (선택)
            </label>
            <div className={styles.profileImageWrapper}>
              <img
                src={previewImage}
                alt="프로필 이미지"
                className={styles.profileImage}
              />
              <label className={styles.uploadButton}>
                업로드
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* <input
              id="profileImageUrl"
              className={styles.input}
              type="text"
              placeholder="이미지 URL 입력"
              value={values.profileImageUrl || ""}
              onChange={(e) => handleChange("profileImageUrl", e.target.value)}
            /> */}
          </div>

          <div className={styles.field}>
            <label htmlFor="maxMembers" className={styles.label}>
              최대 인원 수
            </label>
            <select
              id="maxMembers"
              className={styles.select}
              value={values.maxMembers}
              onChange={(e) =>
                handleChange("maxMembers", Number(e.target.value))
              }
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{`${n}명`}</option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="purpose" className={styles.label}>
              목적
            </label>
            <select
              id="purpose"
              className={styles.select}
              value={values.purpose}
              onChange={(e) => handleChange("purpose", e.target.value)}
            >
              {purposes.map((purpose) => {
                const value = purpose.replace(/^[^\wㄱ-ㅎ가-힣]+/, "");
                return (
                  <option key={value} value={value}>
                    {purpose}
                  </option>
                );
              })}
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="region" className={styles.label}>
              지역 (선택)
            </label>
            <select
              id="region"
              className={styles.select}
              value={values.region || ""}
              onChange={(e) => handleChange("region", e.target.value)}
            >
              <option value="">시/도를 선택하세요</option>
              {regions.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.button} onClick={onCancel}>
              취소
            </button>
            <button type="submit" className={styles.button}>
              수정
            </button>
          </div>

          <button
            type="button"
            className={styles.deleteButton}
            onClick={onDelete}
          >
            스터디방 삭제
          </button>
        </form>
      </div>
    </SideDrawer>
  );
}

export default StudyRoomSettingsModal;
