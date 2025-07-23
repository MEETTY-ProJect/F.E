import React, { useRef } from "react";
import styles from "./ProfileImageUploader.module.css";

interface ProfileImageUploaderProps {
  profileImage: string | File | null;
  onImageChange: (file: File) => void;
}

const ProfileImageUploader = ({
  profileImage,
  onImageChange,
}: ProfileImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const imageUrl =
    profileImage === null
      ? null
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
      <button onClick={handleClick} className={styles.changeButton}>
        이미지 변경
      </button>
    </div>
  );
};

export default ProfileImageUploader;
