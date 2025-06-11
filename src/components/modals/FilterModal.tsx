import React, { useState } from 'react';

// 메인페이지 목적 - 지역 선택할 수 있는 필터모달
interface FilterModalProps {
  isFilterOpen: boolean;
  closeFilter: () => void;
}

function FilterModal({ isFilterOpen, closeFilter }: FilterModalProps) {
  const [selectedPurpose, setSelectedPurpose] = useState<string>('전체');
  const [selectedRegion, setSelectedRegion] = useState<string>('전체');

  const handlePurposeClick = (item: string) => {
    setSelectedPurpose(item);
  };

  const handleRegionClick = (item: string) => {
    setSelectedRegion(item);
  };

  if (!isFilterOpen) return null;

  return (
    <div className="filter-overlay" onClick={closeFilter}>
      <div className="filter-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="filter-text">목적</div>
        <div className="filter-line"></div>
        <div className="purpose-container">
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

        <div className="filter-text">지역</div>
        <div className="filter-line"></div>
        <div className="purpose-container">
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
        <div className="filter-buttons">
          <button className="filter-clear" onClick={closeFilter}>취소</button>
          <button className="filter-close" onClick={closeFilter}>확인</button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;