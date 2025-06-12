import { useState } from "react";
import styles from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles["header-left"]}>
        <img src="" alt="Profile" className={styles["profile-icon"]} />
        <span className={styles.username}>도구리 님</span>
      </div>

      <button className={styles["menu-btn"]} onClick={toggleMenu}>
        ☰
      </button>

      <div
        className={`${styles["dropdown-menu"]} ${
          isMenuOpen ? styles.open : ""
        }`}
      >
        <Link to="/main" className={styles["menu-item"]} onClick={toggleMenu}>
          홈
        </Link>
        <Link
          to="/myrooms"
          className={styles["menu-item"]}
          onClick={toggleMenu}
        >
          내 스터디방
        </Link>
        <Link to="/info" className={styles["menu-item"]} onClick={toggleMenu}>
          내 정보
        </Link>
        <button
          className={`${styles["menu-item"]} ${styles["logout-btn"]}`}
          onClick={toggleMenu}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
};

export default Header;
