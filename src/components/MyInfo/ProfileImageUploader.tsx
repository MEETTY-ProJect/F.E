import React, { useRef } from "react";
import styles from "./ProfileImageUploader.module.css";
import resetImage from "@assets/profile.jpeg";

interface ProfileImageUploaderProps {
  profileImage: string | File | null;
  onImageChange: (file: File | null) => void;
}

const ProfileImageUploader = ({
  profileImage,
  onImageChange,
}: ProfileImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // ✅ 파일명 공백 → 밑줄로 정리
      const sanitizedFileName = file.name.replace(/\s+/g, "_");
      const sanitizedFile = new File([file], sanitizedFileName, {
        type: file.type,
      });
      console.log("profileImage: ", sanitizedFile);
      onImageChange(sanitizedFile);
    }
  };

  const handleResetClick = () => {
    onImageChange(null);
  };

  const handleChangeClick = () => {
    fileInputRef.current?.click();
  };

  const imageUrl =
    profileImage === null
      ? resetImage
      : typeof profileImage === "string"
      ? profileImage
      : URL.createObjectURL(profileImage);

  return (
    <div className={styles.wrapper}>
      {imageUrl ? (
        <img src={imageUrl} alt="프로필 미리보기" className={styles.image} />
      ) : (
        <div className={styles.placeholder}>이미지 없음</div> // 👈 기본 이미지 없이 비워두기
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <div className={styles.buttonGroup}>
        <button onClick={handleResetClick} className={styles.changeButton}>
          기본 이미지
        </button>
        <button onClick={handleChangeClick} className={styles.changeButton}>
          이미지 변경
        </button>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
