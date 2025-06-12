import React from "react";
import styles from "./StudyRoomCard.module.css";
import { useNavigate } from "react-router-dom";

interface StudyRoomCardProps {
  id: number;
  title: string;
  memberCount: number;
  host: string;
  imgSrc?: string;
}

const StudyRoomCard = ({
  id,
  title,
  memberCount,
  host,
  imgSrc,
}: StudyRoomCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/study-room/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.imageWrapper}>
        {imgSrc ? (
          <img src={imgSrc} alt={title} />
        ) : (
          <div className={styles.noImage}>No Image</div>
        )}
      </div>
      <div className={styles.textWrapper}>
        <p className={styles.title}>{title}</p>
      </div>

      {/* <p className={styles.meta}>👥 인원: {memberCount}명</p> */}
      {/* <p className={styles.meta}>👑 방장: {host}</p> */}
    </div>
  );
};

export default StudyRoomCard;
