import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../utils/logout";
import menuIcon from "@assets/memu.png";
import styles from "./Header.module.css"; // ✅ 모듈 방식 import

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    profileImageUrl: "",
    nickname: "",
  });

  useEffect(() => {
    const nickname = localStorage.getItem("username") || "사용자";
    const profileImageUrl =
      localStorage.getItem("profileImage") || "/default-profile.png";
    setUserInfo({ nickname, profileImageUrl });
  }, []);

  return (
    <>
      <div className={styles.mainHeader}>
        <div className={styles.mainLogo}>Logo</div>
        <div className={styles.mainRight}>
          <div className={styles.mainAlarm} />
          <div className={styles.mainProfile}>
            <img
              src={userInfo.profileImageUrl}
              alt="프로필"
              className={styles.profileImg}
            />
          </div>
          <div className={styles.mainName}>{userInfo.nickname} 님</div>
          <img
            src={menuIcon}
            alt="메뉴"
            className={styles.menuIcon}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          />
        </div>
      </div>

      {isMenuOpen && (
        <div
          className={styles.menuOverlay}
          onClick={() => setIsMenuOpen(false)}
        >
          <div
            className={styles.menuModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <Link
              to="/main"
              className={styles.menuItem}
              onClick={() => setIsMenuOpen(false)}
            >
              홈
            </Link>
            <Link
              to="/myrooms"
              className={styles.menuItem}
              onClick={() => setIsMenuOpen(false)}
            >
              내 스터디방
            </Link>
            <Link
              to="/info"
              className={styles.menuItem}
              onClick={() => setIsMenuOpen(false)}
            >
              내 정보
            </Link>
            <button
              onClick={() => {
                logout();
                setIsMenuOpen(false);
              }}
              className={styles.menuItem}
            >
              로그아웃
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
