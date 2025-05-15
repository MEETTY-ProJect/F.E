import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";

interface FilterModalProps {
  isFilterOpen: boolean;
  closeFilter: () => void;
}

function FilterModal({ isFilterOpen, closeFilter }: FilterModalProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handlePurposeClick = (purpose: string) => {
    setSelectedPurpose(purpose === selectedPurpose ? '' : purpose);
  };

  const handleRegionClick = (region: string) => {
    setSelectedRegion(region === selectedRegion ? '' : region);
  };

  if (!isFilterOpen) return null;

  return (
    <div className="filter_overlay" onClick={closeFilter}>
      <div className="filter_modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="filter_text">목적</div>
        <div className="filter_line"></div>
        <div className="purpose_container">
          {["전체", "학업 / 자격증", "취업 / 면접", "개발 / 프로그래밍", "자기 계발"].map((item) => (
            <p
              key={item}
              onClick={() => handlePurposeClick(item)}
              className={selectedPurpose === item ? "selected" : ""}
            >
              {item}
            </p>
          ))}
        </div>

        <div className="filter_text">지역</div>
        <div className="filter_line"></div>
        <div className="purpose_container">
          {["전체", "서울특별시", "부산광역시", "인천광역시", "대전광역시", "경상남도", "경상북도"].map((item) => (
            <p
              key={item}
              onClick={() => handleRegionClick(item)}
              className={selectedRegion === item ? "selected" : ""}
            >
              {item}
            </p>
          ))}
        </div>
        <div className="filter_buttons">
          <button className="filter_clear" onClick={closeFilter}>취소</button>
          <button className="filter_close" onClick={closeFilter}>확인</button>
        </div>
      </div>
    </div>
  );
}

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (room: { title: string; description: string; image: string }) => void;
}

function CreateRoomModal({ isOpen, onClose, onCreate }: CreateRoomModalProps) {
  const [roomTitle, setRoomTitle] = useState<string>("");
  const [roomDescription, setRoomDescription] = useState<string>("");
  const DEFAULT_PROFILE_IMAGE = "/profileD.jpeg";
  const [selectedImage, setSelectedImage] = useState<string>(DEFAULT_PROFILE_IMAGE);
  const options = Array.from({ length: 30 }, (_, i) => i + 1);

  const categories = [
    { value: "all", label: "전체" },
    { value: "study", label: "학업/자격증" },
    { value: "job", label: "취업/면접" },
    { value: "game", label: "게임/프로그래밍" },
    { value: "self", label: "자기계발" },
  ];

  const regions = [
    { value: "all", label: "전체" },
    { value: "seoul", label: "서울특별시" },
    { value: "busan", label: "부산광역시" },
    { value: "incheon", label: "인천광역시" },
    { value: "daejeon", label: "대전광역시" },
    { value: "gyeongnam", label: "경상남도" },
    { value: "gyeongbuk", label: "경상북도" },
  ];

  if (!isOpen) return null;

  const handleCreate = () => {
    if (!roomTitle.trim()) return alert("방 제목을 입력해주세요.");

    onCreate({
      title: roomTitle,
      description: roomDescription,
      image: selectedImage,
    });

    setRoomTitle("");
    setRoomDescription("");
    setSelectedImage(DEFAULT_PROFILE_IMAGE);
    onClose();
  };

  const handleCancelCreate = () => {
    setRoomTitle("");
    setRoomDescription("");
    setSelectedImage(DEFAULT_PROFILE_IMAGE);
    onClose();
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="create_overlay" onClick={onClose}>
      <div className="create_modal_content" onClick={(e) => e.stopPropagation()}>
        <div className="create_text">
          <h3>스터디 방 생성</h3>
          <div className="filter_line"></div>
        </div>

        <div className="create_roomtitle">
          스터디방 이름
          <input
            type="text"
            placeholder="방 제목을 입력하세요."
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
          />
        </div>

        <div className="create_explanation">
          설명
          <textarea
            placeholder="방 설명을 입력하세요."
            value={roomDescription}
            onChange={(e) => setRoomDescription(e.target.value)}
          />
        </div>

        <div className="Main-profile"> 프로필 이미지 </div>
        <div className="Main-profileimage">
          <img src={selectedImage} alt="프로필" className="profile-wide-img" />
          <input
            type="file"
            accept="image/*"
            id="profile-image-upload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <button
            onClick={() => document.getElementById("profile-image-upload")?.click()}
            className="profile-select-button"
          >
            찾기
          </button>
        </div>

        <div className="maximum-people"> 최대 인원 수 </div>
        <select className="peoplecount" id="peopleCount">
          <option value="">인원 선택</option>
          {options.map((num) => (
            <option key={num} value={num}>{num}명</option>
          ))}
        </select>

        <div className="purpose-select"> 목적 </div>
        <select className="purpose-category" id="category">
          {categories.map((cat) => (
            <option key={cat.value} value={cat.value}>{cat.label}</option>
          ))}
        </select>

        <div className="region-select"> 지역 </div>
        <select className="region-category" id="region">
          {regions.map((region) => (
            <option key={region.value} value={region.value}>{region.label}</option>
          ))}
        </select>

        <div className="create-buttons">
          <button className="create-buttons-cancel" onClick={handleCancelCreate}>취소</button>
          <button className="create-buttons-close" onClick={handleCreate}>생성</button>
        </div>
      </div>
    </div>
  );
}

function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [studyRooms, setStudyRooms] = useState<
    { title: string; description: string; image: string }[]
  >([]);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const toggleFilter = () => setIsFilterOpen(prev => !prev);
  const closeFilter = () => setIsFilterOpen(false);

  const openCreateModal = () => setIsCreateModalOpen(true);
  const closeCreateModal = () => setIsCreateModalOpen(false);

  const addRoom = (room: { title: string; description: string; image: string }) => {
    setStudyRooms(prev => [...prev, room]);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    // 리다이렉트 등 필요 시 처리
    window.location.href = "/login";// 로그인 페이지로 이동
  };

  return (
    <div>
      <div className="main_header">
        <div className="main_logo">Logo</div>
        <div className="main_right">
          <div className="main_alarm"></div>
          <div className="main_profile"></div>
          <div className="main_name">도구리 님</div>
          <div className="main_menu" onClick={toggleMenu}></div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="menu_overlay" onClick={toggleMenu}>
          <div className="menu_modal_content" onClick={(e) => e.stopPropagation()}>
            <p>내 스터디방</p>
            <p>내 정보</p>
            <p onClick={handleLogout} style={{ cursor: "pointer" }}>로그아웃</p>
          </div>
        </div>
      )}

      <div className="main_box">
        <form className="main_search">
          <input className="search_txt" type="text" placeholder="검색어를 입력하세요." />
        </form>
        <div className="main_box_search"></div>
      </div>

      <div className="main_button">
        <button className="main_filter" onClick={toggleFilter}>필터</button>
        <div className="main_createroom" onClick={openCreateModal}>방 생성</div>
      </div>

      <FilterModal isFilterOpen={isFilterOpen} closeFilter={closeFilter} />
      <CreateRoomModal isOpen={isCreateModalOpen} onClose={closeCreateModal} onCreate={addRoom} />

      <div className="grid_parent">
        <div className="grid-container">
          {studyRooms.map((room, i) => (
            <div className="grid-room" key={i}>
              <img
              src={room.image}
              alt="Room"
              className="room-profile-img"
              />
              <div className="room-label">{room.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainPage;