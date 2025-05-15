import React from 'react';

type GoogleIconButtonProps = {
  onClick: () => void; // ← 필수
//   다른 props 예: label?: string;
};

const GoogleIconButton: React.FC<GoogleIconButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick} // ✅ props로 받은 onClick 사용
      style={{
        backgroundColor: 'transparent',
        border: 'none',
        padding: 0,
        cursor: 'pointer',
      }}
    >
      <img
        src="/google_login.png"
        alt="Google login"
        style={{ width: '100px', height: '25px' }}
      />
    </button>
  );
};

export default GoogleIconButton;