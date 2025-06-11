import React, { useState, ChangeEvent } from 'react';
import { fetchStudyRooms } from '../pages/StudyGroupList';

interface CreateRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (room: {
    id: number;
    title: string;
    description: string;
    image: string;
    maxPeople: string;
    purpose: string;
    region: string;
  }) => void;
}

function CreateRoomModal({ isOpen, onClose, onCreate }: CreateRoomModalProps) {
  const [roomTitle, setRoomTitle] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [purpose, setPurpose] = useState("전체");
  const [region, setRegion] = useState("전체");

  const DEFAULT_PROFILE_IMAGE = "/profileD.jpeg";
  const [selectedImage, setSelectedImage] = useState<string>(DEFAULT_PROFILE_IMAGE);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const options = Array.from({ length: 30 }, (_, i) => i + 1);
  const categories = ["전체", "학업/자격증", "취업/면접", "게임/프로그래밍", "자기계발"];
  const regions = [
    "전체",
    "서울특별시",
    "부산광역시",
    "인천광역시",
    "대전광역시",
    "경상남도",
    "경상북도",
    "전라남도",
    "전라북도",
    "충청남도",
    "충청북도",
    "강원도",
    "제주특별자치도",
  ];

  if (!isOpen) return null;

  const regionMap: { [key: string]: string } = {
    "전체": "",             // '전체'는 빈 문자열 혹은 null로 처리
    "서울특별시": "SEOUL",
    "부산광역시": "BUSAN",
    "인천광역시": "INCHEON",
    "대전광역시": "DAEJEON",
    "경상남도": "GYEONGSANGNAM",
    "경상북도": "GYEONGSANGBUK",
    "전라남도": "JEOLLANAM",
    "전라북도": "JEOLLABUK",
    "충청남도": "CHUNGCHEONGNAM",
    "충청북도": "CHUNGCHEONGBUK",
    "강원도": "GANGWON",
    "제주특별자치도": "JEJU",
  };  

  // 목적을 백엔드가 원하는 코드로 매핑
  const purposeMap: { [key: string]: string } = {
    "학업/자격증": "ACADEMIC_CERTIFICATE",
    "취업/면접": "EMPLOYMENT",
    "게임/프로그래밍": "ENTREPRENEURSHIP",
    "자기계발": "EXAM",
    "전체": "ETC", // 실제 백엔드에 "GENERAL"이 없으면 ETC로 보냄
  };

  const handleCancelCreate = () => {
    setRoomTitle("");
    setRoomDescription("");
    setMaxPeople("");
    setPurpose("전체");
    setRegion("전체");
    setSelectedImage(DEFAULT_PROFILE_IMAGE);
    onClose();
  };

  const handleCreate = async () => {
    if (!roomTitle.trim()) {
      alert("방 제목을 입력해주세요.");
      return;
    }
    if (!roomDescription.trim()) {
      alert("방 설명을 입력해주세요.");
      return;
    }
    if (!maxPeople) {
      alert("최대 인원을 선택해주세요.");
      return;
    }
  
    const capacityNum = parseInt(maxPeople, 10);
    if (isNaN(capacityNum) || capacityNum < 2) {
      alert("최소 인원은 2명 이상이어야 합니다.");
      return;
    }
  
    const purposeMap: { [key: string]: string } = {
      "학업/자격증": "ACADEMIC_CERTIFICATE",
      "취업/면접": "EMPLOYMENT_INTERVIEW",
      "개발/프로그래밍": "DEVELOPMENT_PROGRAMMING",
      "외국어/자기계발": "FOREIGN_LANGUAGE_SELF_IMPROVEMENT",
      "취미/예술": "HOBBY_ART",
      "전체": "ETC",
    };
  
    const regionMap: { [key: string]: string } = {
      "전체": "",
      "서울특별시": "SEOUL",
      "부산광역시": "BUSAN",
      "인천광역시": "INCHEON",
      "대전광역시": "DAEJEON",
      "경상남도": "GYEONGSANGNAM",
      "경상북도": "GYEONGSANGBUK",
    };
  
    const mappedPurpose = purposeMap[purpose];
    const mappedRegion = regionMap[region] ?? "";
  
    if (!mappedPurpose) {
      alert("목적을 올바르게 선택해주세요.");
      return;
    }
  
    const payload = {
      roomName: roomTitle,
      introduction: roomDescription,
      capacity: capacityNum,
      purpose: mappedPurpose,
      region: mappedRegion,
    };

    const updatedRooms = await fetchStudyRooms({
      roomName: "",
      purpose: "",
      region: 0,
      page: 0,
      size: 10,
    });
    console.log("최신 스터디방 목록:", updatedRooms);    
  
    try {
      const res = await fetch("http://34.64.218.29:8080/api/v1/board/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payload),
      });
  
      const result = await res.json();
  
      if (!res.ok || !result.isSuccess) {
        throw new Error(result.message || "스터디방 생성에 실패했습니다.");
      }
  
      const createdRoom = result.data;
  
      onCreate({
        id: createdRoom.id,
        title: createdRoom.roomName,
        description: createdRoom.introduction,
        image: selectedImage,
        maxPeople: `${createdRoom.capacity}명`,
        purpose,
        region,
      });
  
      // 초기화
      setRoomTitle("");
      setRoomDescription("");
      setMaxPeople("");
      setPurpose("전체");
      setRegion("전체");
      setSelectedImage(DEFAULT_PROFILE_IMAGE);
      onClose();
  
    } catch (error: any) {
      alert(`오류 발생: ${error.message}`);
      console.error(error);
    }
  };
  
  return (
    <div className="create-overlay" onClick={onClose}>
      <div className="create-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="create-text">
          <h3>스터디 방 생성</h3>
          <div className="filter-line"></div>
        </div>
        <div className="create-roomtitle">
          스터디방 이름
          <input
            type="text"
            placeholder="스터디 방 이름을 입력하세요."
            value={roomTitle}
            onChange={(e) => setRoomTitle(e.target.value)}
          />
        </div>

        <div className="create-explanation">
          설명
          <textarea
            placeholder="스터디 방 설명 및 공지사항을 입력하세요"
            value={roomDescription}
            onChange={(e) => setRoomDescription(e.target.value)}
          />
        </div>

        <div className="Main-profile">프로필 이미지</div>
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

        <div className="maximum-people">최대 인원 수</div>
        <select
  className="peoplecount"
  value={maxPeople}
  onChange={(e) => setMaxPeople(e.target.value)}
>
  <option value="">인원 선택</option>
  {options.map((num) => (
    <option key={num} value={num.toString()}>{num}명</option>
  ))}
</select>


        <div className="purpose-select">목적</div>
        <select
          className="purpose-category"
          value={purpose}
          onChange={(e) => setPurpose(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <div className="region-select">지역</div>
        <select
          className="region-category"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          {regions.map((reg) => (
            <option key={reg} value={reg}>{reg}</option>
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

export default CreateRoomModal;