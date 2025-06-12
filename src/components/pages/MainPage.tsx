import { useState, useEffect, useCallback } from "react";
import "../pages/MainPage.css";
import FilterModal from "../modals/FilterModal";
import CreateRoomModal from "../modals/CreateRoomModal";
import ApprovalRequestModal from "../modals/ApprovalRequestModal";
import { logout } from "../utils/logout";

function MainPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<any | null>(null);
  const [userInfo, setUserInfo] = useState({
    profileImageUrl: "",
    nickname: "",
  });
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [studyRooms, setStudyRooms] = useState<any[]>([]);
  const [refreshListTrigger, setRefreshListTrigger] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [fade, setFade] = useState(false);
  const roomsPerPage = 6;

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = results.slice(indexOfFirstRoom, indexOfLastRoom);
  const totalPages = Math.ceil(results.length / roomsPerPage);

  const changePage = (pageNumber: number) => {
    setFade(true);
    setTimeout(() => {
      setCurrentPage(pageNumber);
      setFade(false);
    }, 300);
  };

  const openApprovalModal = (room: any) => {
    setSelectedRoom(room);
    setIsApprovalModalOpen(true);
  };

  const fetchStudyRooms = useCallback(async () => {
    try {
      const res = await fetch("http://34.64.218.29:8080/api/v1/board/create", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) throw new Error("스터디방 목록 불러오기 실패");

      const data = await res.json();
      setStudyRooms(data.result.content);
      setResults(data.result.content);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchStudyRooms();
  }, [fetchStudyRooms, refreshListTrigger]);

  useEffect(() => {
    const nickname = localStorage.getItem("username") || "사용자";
    const profileImageUrl =
      localStorage.getItem("profileImage") || "/default-profile.png";
    setUserInfo({ nickname, profileImageUrl });
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const lowerText = searchText.toLowerCase().trim();

    const matchIndexes = studyRooms
      .map((room, index) =>
        (room.title?.toLowerCase().includes(lowerText) ?? false) ||
        (room.category?.toLowerCase().includes(lowerText) ?? false)
          ? index
          : -1
      )
      .filter((i) => i !== -1);

    if (matchIndexes.length > 0) {
      const middleMatchIndex =
        matchIndexes[Math.floor(matchIndexes.length / 2)];
      const targetPage = Math.floor(middleMatchIndex / roomsPerPage) + 1;
      setCurrentPage(targetPage);
      setResults(studyRooms);
    } else {
      setResults([]);
    }

    setSearchText("");
  };

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
            <button type="submit" className="main-search-btn" aria-label="검색">
              <span className="visually-hidden">검색</span>
            </button>
          </div>
        </form>
      </div>

      {/* 필터 및 방 생성 */}
      <div className="main-button">
        <button className="main-filter" onClick={() => setIsFilterOpen(true)}>
          필터
        </button>
        <div
          className="main-createroom"
          onClick={() => setIsCreateModalOpen(true)}
        >
          방 생성
        </div>
      </div>

      {/* 모달 컴포넌트들 */}
      <FilterModal
        isFilterOpen={isFilterOpen}
        closeFilter={() => setIsFilterOpen(false)}
      />
      <CreateRoomModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={(room) => {
          const newRooms = [...studyRooms, room];
          setStudyRooms(newRooms);
          setResults(newRooms);
          setCurrentPage(Math.ceil(newRooms.length / roomsPerPage));
        }}
      />
      <ApprovalRequestModal
        isOpen={isApprovalModalOpen}
        onClose={() => setIsApprovalModalOpen(false)}
        room={selectedRoom}
      />

      {/* 스터디방 리스트 */}
      <div className={`grid-container ${fade ? "fade-out" : ""}`}>
        {results.length === 0 ? (
          <div className="no-results-message">
            스터디방이 존재하지 않습니다.
          </div>
        ) : (
          currentRooms.map((room: any, i: number) => (
            <div
              key={i}
              className="grid-room"
              onClick={() => openApprovalModal(room)}
            >
              <img src={room.image} alt="Room" className="room-profile-img" />
              <div className="room-label">{room.title}</div>
            </div>
          ))
        )}
      </div>

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
