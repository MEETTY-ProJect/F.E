import React, { useState, useEffect, useCallback } from "react";
import "../pages/MainPage.css";
import FilterModal from "../modals/FilterModal";
import CreateRoomModal from "../modals/CreateRoomModal";
import ApprovalRequestModal from "../modals/ApprovalRequestModal";
import { logout } from "../utils/logout";
import MainAlarm from "../modals/MainAlarm";
import axios from "axios";

interface RoomData {
  id: number;
  title: string;
  description: string;
  image: string;
  maxPeople: string;
  purpose: string;
  region: string;
}

function MainPage() {
  // 필터 옵션 상수 (예시)
  const purposes = ["공부", "취미", "운동", "프로젝트"];
  const regions = ["서울", "부산", "대전", "광주"];
  const maxPeopleOptions = [4, 6, 8, 10];

  // 모달, 유저 정보 등 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState({
    profileImageUrl: "",
    nickname: "",
  });

  // 검색어 상태
  const [searchText, setSearchText] = useState("");

  const [rooms, setRooms] = useState<RoomData[]>([]);

  // CreateRoomModal onCreate 콜백
  const handleRoomCreate = (newRoom: RoomData) => {
    setRooms((prevRooms) => [newRoom, ...prevRooms]);
  };

  // 스터디방 리스트 상태
  const [studyRooms, setStudyRooms] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [refreshListTrigger, setRefreshListTrigger] = useState(0);
  const roomsPerPage = 6;
  const [fade, setFade] = useState(false);

  // 방 생성 시 초기 필터값 상태 (랜덤값으로 초기화)
  const [selectedPurpose, setSelectedPurpose] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedMaxPeople, setSelectedMaxPeople] = useState<number | null>(
    null
  );

  // API에서 스터디방 데이터 가져오기
  const fetchStudyRooms = useCallback(async () => {
    try {
      const response = await axios.get(
        `http://34.64.218.29:8080/api/v1/board?page=${
          currentPage - 1
        }&size=${roomsPerPage}`,
        { withCredentials: true }
      );

      if (response.data.isSuccess) {
        const { studyGroups, totalPages } = response.data.data;
        setStudyRooms(studyGroups);
        setTotalPages(totalPages);
      }
    } catch (error) {
      console.error("스터디방 목록을 불러오는데 실패했습니다:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchStudyRooms();
  }, [fetchStudyRooms, refreshListTrigger]);

  // 유저 정보 초기화
  useEffect(() => {
    const nickname = localStorage.getItem("username") || "사용자";
    const profileImageUrl =
      localStorage.getItem("profileImage") || "/default-profile.png";
    setUserInfo({ nickname, profileImageUrl });
  }, []);

  // 페이지 변경 시 fade 효과 주기
  const changePage = (pageNumber: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setFade(false);
    }, 300);
  };

  // 승인 요청 모달 열기
  const openApprovalModal = (room: any) => {
    setSelectedRoom(room);
    setIsApprovalModalOpen(true);
  };

  // 랜덤값 선택 함수
  function getRandomItem<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // 방 생성 모달 열 때 랜덤 필터 초기화 (한 번만)
  const openCreateModal = () => {
    setSelectedPurpose(getRandomItem(purposes));
    setSelectedRegion(getRandomItem(regions));
    setSelectedMaxPeople(getRandomItem(maxPeopleOptions));
    setIsCreateModalOpen(true);
  };

  // 방 생성 완료 핸들러 (랜덤 초기화 없이 모달 닫고 리스트 갱신)
  const handleCreate = () => {
    setRefreshListTrigger((prev) => prev + 1);
    setIsCreateModalOpen(false);
  };

  // 검색 폼 제출 핸들러 (페이지 1로 초기화)
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  // 검색어에 맞는 방만 필터링해서 화면에 보여줄 배열
  const displayedRooms = studyRooms.filter(
    (room) =>
      room.roomName?.toLowerCase().includes(searchText.toLowerCase()) ||
      room.purpose?.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div>
      <div className="main-box">
        <form className="main-search" onSubmit={handleSearch}>
          <div className="search-wrapper">
            <input
              className="search-txt"
              type="text"
              placeholder="스터디방 이름 또는 카테고리를 입력하세요."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button
              type="submit"
              className="main-search-btn"
              aria-label="검색"
            ></button>
          </div>
        </form>
      </div>

      {/* 필터 및 방 생성 버튼 */}
      <div className="main-button">
        <button className="main-filter" onClick={() => setIsFilterOpen(true)}>
          필터
        </button>
        <div className="main-createroom" onClick={openCreateModal}>
          방 생성
        </div>
      </div>

      {/* 스터디방 리스트 (검색 결과 기준) */}
      <div className={`grid-container ${fade ? "fade-out" : "fade-in"}`}>
        {displayedRooms.length > 0 ? (
          displayedRooms.map((room: any, i: number) => (
            <div
              key={i}
              className="grid-room"
              onClick={() => openApprovalModal(room)}
            >
              <img
                src={room.imageUrl || "/profileC.png"}
                alt={room.roomName}
                className="room-profile-img"
              />
              <div className="room-label">{room.roomName}</div>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            검색 결과가 없습니다.
          </p>
        )}
      </div>

      {/* 모달 */}
      <FilterModal
        isFilterOpen={isFilterOpen}
        closeFilter={() => setIsFilterOpen(false)}
      />
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreate}
        purposes={purposes}
        regions={regions}
        maxPeopleOptions={maxPeopleOptions}
        selectedPurpose={selectedPurpose}
        selectedRegion={selectedRegion}
        selectedMaxPeople={selectedMaxPeople}
      />
      <ApprovalRequestModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        room={selectedRoom}
      />

      {/* 페이지네이션 */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => changePage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
          >
            이전
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => changePage(i + 1)}
              className={currentPage === i + 1 ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => changePage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
}

export default MainPage;
