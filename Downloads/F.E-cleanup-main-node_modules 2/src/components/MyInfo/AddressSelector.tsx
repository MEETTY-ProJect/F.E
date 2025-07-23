import React from "react";
import styles from "./AddressSelector.module.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const regions = [
  "서울특별시",
  "부산광역시",
  "대구광역시",
  "인천광역시",
  "광주광역시",
  "대전광역시",
  "울산광역시",
  "세종특별자치시",
  "경기도",
  "강원도",
  "충청북도",
  "충청남도",
  "전라북도",
  "전라남도",
  "경상북도",
  "경상남도",
  "제주특별자치도",
];

const AddressSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div>
      <label htmlFor="address">주소</label>
      <select
        id="address"
        className={styles.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">시/도를 선택하세요</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressSelector;
